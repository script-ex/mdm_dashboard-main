import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  useTheme,
  Typography,
  Tooltip
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import TrashIcon from '@mui/icons-material/Delete';
import { ApiService } from 'src/services/ApiService';

import { useTranslation } from 'react-i18next';

// document.body.dir = i18n.dir();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4
};

export function AddUsersToMySession({ mdmSession, handleClose, handleUpdate }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    ApiService.getUsersInMyOrganizationWithMDMLicense().then((response) => {
      setUsers(response.data.data);
    });
  }, [mdmSession.organizationId]);

  const filterUsers = (users) => {
    return users.filter((user) => {
      return (
        !mdmSession.sharedWithUsers ||
        mdmSession.sharedWithUsers.findIndex(
          (sharedUser) => sharedUser.userId === user.id
        ) === -1
      );
    });
  };

  const findUser = (id: string) => {
    return users.find((user) => user.id === id);
  };

  const removeUser = async (id: string) => {
    const _users = mdmSession.sharedWithUsers.filter(
      (user) => user.userId !== id
    );
    await ApiService.updateShareMDM(mdmSession.id, _users);
    handleUpdate({
      ...mdmSession,
      sharedWithUsers: _users
    });
  };

  const updateRoleUser = async (id: string, role: string) => {
    const _users = mdmSession.sharedWithUsers.map((user) => {
      if (user.userId === id) {
        user.role = role;
      }
      return user;
    });
    await ApiService.updateShareMDM(mdmSession.id, _users);
    handleUpdate({
      ...mdmSession,
      sharedWithUsers: _users
    });
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Add Users for <b>{mdmSession.reportName}</b>
      </Typography>
      <Formik
        initialValues={{
          users: [],
          role: 'EDITOR'
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            let shareUsers = mdmSession.sharedWithUsers || [];
            values.users.forEach((userId) => {
              shareUsers.push({
                userId,
                role: values.role
              });
            });
            await ApiService.updateShareMDM(mdmSession.id, shareUsers);
            handleClose();
          } catch (e) {
            console.error(e);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Users</InputLabel>
              <Grid container spacing="2">
                <Grid item xs={8}>
                  <Select
                    fullWidth
                    multiple
                    label="Users"
                    value={values.users}
                    onChange={(e) => {
                      setFieldValue('users', e.target.value);
                    }}
                    input={<OutlinedInput label="Users" />}
                  >
                    {filterUsers(users).map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Box display={'flex'} alignItems="center">
                          <Avatar
                            sx={{ width: 18, height: 18, mr: 1 }}
                            src={user.avatarPath}
                          />
                          {user.firstName} {user.lastName}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    value={values.role}
                    onChange={(e) => {
                      setFieldValue('role', e.target.value);
                    }}
                    input={<OutlinedInput label="Access" />}
                  >
                    <MenuItem value="EDITOR">Editor</MenuItem>
                    <MenuItem value="VIEWER">Viewer</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </FormControl>
            <br />
            {mdmSession &&
              mdmSession.sharedWithUsers &&
              mdmSession.sharedWithUsers.length > 0 && (
                <>
                  <Typography mt="2" variant="h6" component="h2">
                    {t('Shared with users')}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {mdmSession.sharedWithUsers.map((user) => {
                      const _user = findUser(user.userId);
                      if (!_user) {
                        return null;
                      }
                      return (
                        <Box
                          mt={1}
                          key={user.userId}
                          display={'flex'}
                          justifyContent="space-between"
                        >
                          <Typography display="flex" alignItems="center">
                            <Avatar
                              sx={{ width: 24, height: 24, mr: 1 }}
                              src={_user.avatarPath}
                            />
                            {_user.firstName} {_user.lastName}
                          </Typography>
                          <Box>
                            <Select
                              size="small"
                              onChange={(e) => {
                                updateRoleUser(user.userId, e.target.value);
                              }}
                              value={user.role}
                              input={<OutlinedInput label="Access" />}
                            >
                              <MenuItem value="EDITOR">Editor</MenuItem>
                              <MenuItem value="VIEWER">Viewer</MenuItem>
                            </Select>
                            <Tooltip
                              title={t('Remove user from session')}
                              placement="bottom"
                            >
                              <IconButton
                                onClick={() => removeUser(user.userId)}
                                sx={{
                                  ml: 1,
                                  '&:hover': {
                                    background: theme.colors.primary.lighter
                                  },
                                  color: theme.palette.primary.main
                                }}
                              >
                                <TrashIcon width="sm" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </>
              )}

            <Button disabled={isSubmitting} type="submit">
              {t('Submit')}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
