import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
  Stack,
  TextField,
  Icon,
  Tooltip
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { ApiService } from 'src/services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, rootStoreDispatch, rootStoreSelector } from 'src/store';
import { setJWT } from 'src/store/reducer/auth';
import { ROUTES } from 'src/routes';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

// Define validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

function AuthSignIn() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isLoggedIn = rootStoreSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const dispatch = rootStoreDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => navigate(ROUTES.DASHBOARD), 1);
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSubmit = async (values) => {
    try {
      setErrorMessage('');
      setLoading(true);
      const response = await ApiService.login({
        username: values.email.trim().toLowerCase(),
        password: values.password
      });
      if (response.status === 200 && response.data.data.token) {
        dispatch(setJWT({ jwtToken: response.data.data.token }));
      }

      // navigate('/dashboards', { replace: true });
    } catch (err) {
      console.log(err);
      setErrorMessage('Incorrect Username / Password');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('Auth - Sign In')}</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Logo />
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                {t('Sign In')}
              </Typography>
            </Container>
          </Box>

          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Stack spacing={3}>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  onSubmit={(values) => {
                    handleLoginSubmit(values);
                  }}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                        {errorMessage}
                      </Typography>
                      <TextField
                        sx={{ mb: 2 }}
                        fullWidth
                        placeholder={t('Email Address')}
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={t('Email Address')}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <TextField
                        sx={{ mb: 2 }}
                        fullWidth
                        placeholder={t('Password')}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={t('Password')}
                        type={showPassword ? 'text' : 'password'}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Icon
                                  component={
                                    showPassword ? Visibility : VisibilityOff
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <Tooltip arrow placement="bottom" title="Login">
                        <LoadingButton
                          loading={loading}
                          sx={{ mb: 2 }}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: '#000000' }}
                        >
                          Login
                        </LoadingButton>
                      </Tooltip>
                    </form>
                  )}
                </Formik>
              </Stack>

              {/* <Divider sx={{ my: 4 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip arrow placement="top" title="Facebook">
                  <IconButton color="primary">
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Twitter">
                  <IconButton color="primary">
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Instagram">
                  <IconButton color="primary">
                    <InstagramIcon />
                  </IconButton>
                </Tooltip>
              </Box> */}
            </Box>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default AuthSignIn;
