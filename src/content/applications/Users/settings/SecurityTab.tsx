import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  TextField
} from '@mui/material';

import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, subHours, subWeeks, subDays, set } from 'date-fns';
import { Formik } from 'formik';
import { ApiService } from 'src/services/ApiService';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

function SecurityTab() {
  const [changePassword, setChangePassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Social Accounts</Typography>
          <Typography variant="subtitle2">
            Manage connected social accounts options
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarWrapper src="/static/images/logo/google.svg" />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Google"
                secondary="A Google account hasn’t been yet added to your account"
              />
              <Button color="secondary" size="large" variant="contained">
                Connect
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Facebook"
                secondary="Your Facebook account has been successfully connected"
              />
              <ButtonError size="large" variant="contained">
                Revoke access
              </ButtonError>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Twitter"
                secondary="Your Twitter account was last syncronized 6 days ago"
              />
              <ButtonError size="large" variant="contained">
                Revoke access
              </ButtonError>
            </ListItem>
          </List>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">
            Change your security preferences below
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              <Button
                onClick={() => setChangePassword(true)}
                size="large"
                variant="outlined"
              >
                Change password
              </Button>
            </ListItem>
            {showSuccess && (
              <Box pl={3}>
                <Typography variant="h6" color={'green'} sx={{ mb: 1 }}>
                  Password changed successfully
                </Typography>
              </Box>
            )}

            {changePassword && (
              <Formik
                initialValues={{
                  oldPassword: '',
                  newPassword: '',
                  retryPassword: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  try {
                    await ApiService.updatePassword({
                      previousPassword: values.oldPassword,
                      newPassword: values.newPassword
                    });
                    setShowSuccess(true);
                    setChangePassword(false);
                  } catch (err) {
                    console.log(err);
                    setFormError(err.response.data.message);
                    setTimeout(() => {
                      setFormError('');
                    }, 5000);
                  }
                  setSubmitting(false);
                }}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.oldPassword) {
                    errors.oldPassword = 'Required';
                  }
                  if (!values.newPassword) {
                    errors.newPassword = 'Required';
                  }
                  if (!values.retryPassword) {
                    errors.retryPassword = 'Required';
                  }

                  if (values.newPassword.length < 8) {
                    errors.newPassword = 'Password must be above 8 characters';
                  }

                  if (values.newPassword !== values.retryPassword) {
                    errors.retryPassword = 'Passwords do not match';
                  }
                  return errors;
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container padding={3} spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          style={{ width: '50%', minWidth: '300px' }}
                          label="Old Password"
                          name="oldPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.oldPassword}
                          variant="outlined"
                          type="password"
                        />
                        <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                          {errors.oldPassword &&
                            touched.oldPassword &&
                            errors.oldPassword}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          style={{ width: '50%', minWidth: '300px' }}
                          label="New Password"
                          name="newPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.newPassword}
                          variant="outlined"
                          type="password"
                        />
                        <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                          {errors.newPassword &&
                            touched.newPassword &&
                            errors.newPassword}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          style={{ width: '50%', minWidth: '300px' }}
                          label="Retry Password"
                          name="retryPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.retryPassword}
                          variant="outlined"
                          type="password"
                        />
                        <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                          {errors.retryPassword &&
                            touched.retryPassword &&
                            errors.retryPassword}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                          {formError}
                        </Typography>
                        <Button
                          color="primary"
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            )}
            {/* <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem> */}
          </List>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Access Logs"
            subheader="Recent sign in activity logs"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{log.ipaddress}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid> */}
    </Grid>
  );
}

export default SecurityTab;
