import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { RootState, rootStoreSelector } from 'src/store';
import { useState } from 'react';
import { RemoveRedEyeTwoTone } from '@mui/icons-material';
import { Formik } from 'formik';
import { ApiService } from 'src/services/ApiService';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const Input = styled('input')({
  display: 'none'
});

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

function EditProfileTab() {
  const [accountEditMode, setAccountEditMode] = useState(false);
  const [personalEditMode, setPersonalEditMode] = useState(false);
  const user = rootStoreSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null;
  }

  const handleUpload = (event: any) => {
    const form = new FormData();

    form.append('avatar', event.target.files[0]);

    ApiService.updateAvatar(form).then((res) => {
      window.location.reload();
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          style={{
            paddingTop: '90px'
          }}
        >
          <Grid item xs={12} md={8}>
            <AvatarWrapper>
              <Avatar variant="rounded" alt={user.name} src={user.avatarPath} />
              <ButtonUploadWrapper>
                <Input
                  onChange={handleUpload}
                  accept="image/*"
                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary">
                    <UploadTwoToneIcon />
                  </IconButton>
                </label>
              </ButtonUploadWrapper>
            </AvatarWrapper>
          </Grid>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            <Button
              onClick={() => setPersonalEditMode(!personalEditMode)}
              variant="text"
              startIcon={
                personalEditMode ? <RemoveRedEyeTwoTone /> : <EditTwoToneIcon />
              }
            >
              {personalEditMode ? 'View' : 'Edit'}
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            {personalEditMode ? (
              <Typography variant="subtitle2">
                <Formik
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                      try {
                        await ApiService.updateMe(values);
                        setPersonalEditMode(false);
                        window.location.reload();
                      } catch (err) {
                        console.log(err);
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age
                  }}
                  validate={(values) => {
                    const errors: any = {};
                    if (!values.firstName) {
                      errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                      errors.lastName = 'Required';
                    }
                    if (!values.age) {
                      errors.age = 'Required';
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
                      <Grid container spacing={0}>
                        <Grid item container xs={12}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                          >
                            <Box pr={3}>First Name:</Box>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4}>
                            <TextField
                              fullWidth
                              name="firstName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              variant="outlined"
                            />
                            <Typography variant="subtitle2" color="error">
                              {errors.firstName &&
                                touched.firstName &&
                                errors.firstName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid mt={3} item container xs={12}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                          >
                            <Box pr={3}>Last Name:</Box>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4}>
                            <TextField
                              fullWidth
                              name="lastName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              variant="outlined"
                            />
                            <Typography variant="subtitle2" color="error">
                              {errors.lastName &&
                                touched.lastName &&
                                errors.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid mt={3} item container xs={12}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                          >
                            <Box pr={3}>Age:</Box>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4}>
                            <TextField
                              fullWidth
                              name="age"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.age}
                              variant="outlined"
                            />
                            <Typography variant="subtitle2" color="error">
                              {errors.age && touched.age && errors.age}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          mt={3}
                          item
                          container
                          xs={12}
                          sm={7}
                          display={'flex'}
                          justifyContent={'flex-end'}
                        >
                          <Button
                            disabled={isSubmitting}
                            variant="contained"
                            type="submit"
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      First Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{user.firstName}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Last Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{user.lastName}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Age:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{user.age}</b>
                    </Text>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Address:
                  </Box>
                </Grid> */}
                  {/* <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">
                      1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California,
                      93262
                    </Text>
                  </Box>
                </Grid> */}
                </Grid>
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your account
              </Typography>
            </Box>
            <Button
              onClick={() => setAccountEditMode(!accountEditMode)}
              variant="text"
              startIcon={
                accountEditMode ? <RemoveRedEyeTwoTone /> : <EditTwoToneIcon />
              }
            >
              {accountEditMode ? 'View' : 'Edit'}
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            {accountEditMode ? (
              <Typography variant="subtitle2">
                <Formik
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                      try {
                        await ApiService.updateMe(values);
                        window.location.reload();
                        setAccountEditMode(false);
                      } catch (err) {
                        console.log(err);
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  initialValues={{
                    language: user.language
                  }}
                  validate={(values) => {
                    const errors: any = {};
                    if (!values.language) {
                      errors.language = 'Required';
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
                      <Grid container spacing={0}>
                        <Grid item container xs={12}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                          >
                            <Box pr={3}>Language:</Box>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4}>
                            <Select
                              fullWidth
                              name="language"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.language}
                              variant="outlined"
                            >
                              <MenuItem value="en-US">English (US)</MenuItem>
                            </Select>
                          </Grid>
                        </Grid>
                        <Grid
                          mt={3}
                          item
                          container
                          xs={12}
                          sm={7}
                          display={'flex'}
                          justifyContent={'flex-end'}
                        >
                          <Button
                            disabled={isSubmitting}
                            variant="contained"
                            type="submit"
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Language:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{user.language}</b>
                    </Text>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid> */}
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Account status:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Label color="success">
                      <DoneTwoToneIcon fontSize="small" />
                      <b>Active</b>
                    </Label>
                  </Grid>
                </Grid>
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>example@demo.com</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>demo@example.com</b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  );
}

export default EditProfileTab;
