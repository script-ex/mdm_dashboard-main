import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Box,
  ButtonBase,
  Card,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { ApiService } from 'src/services/ApiService';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RootState, rootStoreSelector } from 'src/store';

function DashboardCrypto() {
  const { t, i18n } = useTranslation();
  const currentUser = rootStoreSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const handleMDMClick = () => {
    // open in new tab
    // ApiService.fetchLatestMDM(true).then((res) => {
    // const mdmId = res.data.data.id;
    navigate(`/surveys/mdm/home`);
    // });
  };
  return (
    <>
      <Helmet>
        <title>{t('My Dashboard')}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container
        maxWidth="lg"
        style={{
          marginBottom: '2rem'
        }}
      >
        {currentUser &&
          (currentUser.isSuperAdmin ||
            currentUser.authorizedSurveys.length > 0) && (
            <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item xs={6}>
                <ButtonBase onClick={() => handleMDMClick()}>
                  <Card
                    sx={{
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 0 11px rgba(33,33,33,.2)'
                      }
                    }}
                  >
                    <Box p={4}>
                      <img
                        style={{
                          borderRadius: '1rem'
                        }}
                        src="/th.jpg"
                        width={'100%'}
                      />
                      <Typography
                        sx={{
                          pt: 1,
                          pb: 3
                        }}
                        variant="h3"
                      >
                        {t('My Diversity Manager (MDM)')}
                      </Typography>
                    </Box>
                  </Card>
                </ButtonBase>
              </Grid>
            </Grid>
          )}
        {currentUser &&
          !(
            currentUser.isSuperAdmin || currentUser.authorizedSurveys.length > 0
          ) && (
            <Typography>
              {t(
                'You are not authorized to access any surveys. Please contact your organization!'
              )}
            </Typography>
          )}
        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid> */}
      </Container>
    </>
  );
}

export default DashboardCrypto;
