import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { LicensePurchaseActionForm } from './LicensePurchaseActionForm';
import {useTranslation} from 'react-i18next';

export default function LicensePurchaseAction() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <>
      <Helmet>
        <title>{t('Licenses')} - Add License</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container alignItems={'stretch'}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('Add License')}
          </Typography>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <LicensePurchaseActionForm />
      </Container>
    </>
  );
}
