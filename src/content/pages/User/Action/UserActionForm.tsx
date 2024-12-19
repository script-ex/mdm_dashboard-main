import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/routes';
import { ApiService } from 'src/services/ApiService';
import { RootState, rootStoreSelector } from 'src/store';
import { useTranslation } from 'react-i18next';

export function UserActionForm() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const user = rootStoreSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.isSuperAdmin) {
      ApiService.getOrganizations().then((organizations) => {
        setOrganizations(organizations.data?.data);
      });
    }
  }, [user?.id]);

  return (
    <>
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            try {
              let userValues = {
                ...values,
                organizationId: user?.isSuperAdmin
                  ? values.organizationId
                  : user?.organizationId
              };
              delete userValues.retryPassword;
              await ApiService.signup(userValues);
              navigate(ROUTES.USER.OVERVIEW);
            } catch (err) {
              setErrorMessage(err?.response?.data?.message || err.message);
            }
          } catch (e) {
            console.error(e);
          }
          setSubmitting(false);
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          retryPassword: '',
          status: true,
          organizationId: ''
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }

          if (values.password && values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }

          if (values.password !== values.retryPassword) {
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
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container maxWidth="md" gap={2}>
              {user?.isSuperAdmin && (
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="organizationId-label">
                      {t('Organization')}
                    </InputLabel>
                    <Select
                      labelId="organizationId-label"
                      id="organizationId"
                      value={values.organizationId}
                      onChange={(e) => {
                        setFieldValue('organizationId', e.target.value);
                      }}
                      label="Organization"
                    >
                      {organizations.map((organization: any) => (
                        <MenuItem key={organization.id} value={organization.id}>
                          {organization.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid container>
                <Grid paddingRight={1} item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid paddingLeft={1} item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color={'red'}>
                    {errors.firstName &&
                      touched.firstName &&
                      'First Name: ' + errors.firstName}{' '}
                    {errors.firstName && touched.firstName && <br />}
                    {errors.lastName &&
                      touched.lastName &&
                      'Last Name: ' + errors.lastName}{' '}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t('Email')}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                  type="email"
                />
                <Typography variant="h6" color={'red'}>
                  {errors.email && touched.email && errors.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t('Password')}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                  type="password"
                />
                <Typography variant="h6" color={'red'}>
                  {errors.password && touched.password && errors.password}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t('Retry Password')}
                  name="retryPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.retryPassword}
                  variant="outlined"
                  type="password"
                />
                <Typography variant="h6" color={'red'}>
                  {errors.retryPassword &&
                    touched.retryPassword &&
                    errors.retryPassword}
                </Typography>

                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  marginTop={3}
                >
                  <Typography>{t('Status')}</Typography>
                  <FormControl fullWidth>
                    <Switch
                      checked={values.status}
                      onChange={handleChange}
                      name="status"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </FormControl>
                </Grid>

                <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                  {errorMessage}
                </Typography>
                <Grid marginTop={2} item xs={12}>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {t('Submit')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
