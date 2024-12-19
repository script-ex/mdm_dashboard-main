import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Icon,
  Grid
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
import { ROUTES } from 'src/routes';
import {useTranslation} from 'react-i18next';

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

function AuthSignUp() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      setErrorMessage('');
      setLoading(true);
      const response = await ApiService.signup({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      navigate(ROUTES.LOGIN, { replace: true });

      // navigate('/dashboards', { replace: true });
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  const validateForm = () => {
    return (
      email.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      repeatPassword.length > 0 &&
      password === repeatPassword
    );
  };

  return (
    <>
      <Helmet>
        <title>Auth - Sign Up</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Logo />
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                {t('Sign Up')}
              </Typography>
            </Container>
          </Box>

          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Stack spacing={3}>
                <Typography variant="h6" color={'red'} sx={{ mb: 1 }}>
                  {errorMessage}
                </Typography>
                <Grid container>
                  <Grid paddingRight={1} item xs={6}>
                    <TextField
                      fullWidth
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      name="firstName"
                      label={t("First Name")}
                      type="text"
                    />
                  </Grid>
                  <Grid paddingLeft={1} item xs={6}>
                    <TextField
                      fullWidth
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name="lastName"
                      label={t("Last Name")}
                      type="text"
                    />
                  </Grid>
                </Grid>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  label={t("Email Address")}
                  type="email"
                />
                <TextField
                  name="password"
                  label={t("Password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
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
                <TextField
                  name="repeatPassword"
                  label={t("Repeat Password")}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  type="password"
                />
              </Stack>

              {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

              <LoadingButton
                disabled={!validateForm()}
                loading={loading}
                sx={{ my: 4 }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: validateForm() ? '#000000' : '' }}
                onClick={handleClick}
              >
                Sign Up
              </LoadingButton>
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

export default AuthSignUp;
