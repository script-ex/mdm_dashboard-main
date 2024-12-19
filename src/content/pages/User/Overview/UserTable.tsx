import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { ApiService } from 'src/services/ApiService';
import { useTranslation } from 'react-i18next';
import {
  CancelOutlined,
  CheckCircleOutline,
  StarOutline,
  StartOutlined
} from '@mui/icons-material';

const applyPagination = (users: any[], page: number, limit: number): any[] => {
  return users.slice(page * limit, page * limit + limit);
};
export const UserTable = ({ organizationId }) => {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    ApiService.getUsersByOrganizationId(organizationId).then((res) => {
      if (organizationId == 'all') {
        setUsers(res.data.users);
        setOrganizations(res.data.organizations);
      }
    });
  }, [organizationId]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    userId: string
  ): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = users;
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;
  const theme = useTheme();

  const handleSwitchRole = async (user: any) => {
    const _user = {
      ...user,
      role: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
    };
    await ApiService.updateUser(user.id, {
      role: _user.role
    });

    ApiService.getUsersByOrganizationId(organizationId).then((res) => {
      setUsers(res.data.data);
    });
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>{t('ID')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
              {organizationId == 'all' ? (
                <TableCell>{t('Organization')}</TableCell>
              ) : null}
              <TableCell>{t('Joined At')}</TableCell>
              <TableCell>{t('Email')}</TableCell>
              <TableCell>{t('Active Licenses')}</TableCell>
              <TableCell>{t('Admin')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => {
              const isUserSelected = selectedUsers.includes(user.id);
              return (
                <TableRow hover key={user.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUser(event, user.id)
                      }
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      display={'flex'}
                      alignItems={'center'}
                    >
                      <Avatar
                        src={user.avatarPath}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      {user.firstName} {user.lastName}
                    </Typography>
                  </TableCell>
                  {organizationId == 'all' ? (
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {
                          organizations.find(
                            (organization) =>
                              organization.id === user.organizationId
                          )?.name
                        }
                      </Typography>
                    </TableCell>
                  ) : null}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user?.licenseIds?.join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        user.isSuperAdmin
                          ? 'Super Admin'
                          : user.role === 'ADMIN'
                          ? 'Demote to User'
                          : 'Upgrade to Admin'
                      }
                    >
                      {user?.isSuperAdmin ? (
                        <IconButton>
                          <StarOutline color="secondary" fontSize="small" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleSwitchRole(user)}
                          sx={{
                            ...(user.role === 'ADMIN' && {
                              color: theme.palette.success.main
                            })
                          }}
                        >
                          {user.role === 'ADMIN' ? (
                            <CheckCircleOutline
                              fontSize="small"
                              color="success"
                            />
                          ) : (
                            <CancelOutlined fontSize="small" color="error" />
                          )}
                        </IconButton>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.status ? t('Active') : t('Inactive')}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </>
  );
};
