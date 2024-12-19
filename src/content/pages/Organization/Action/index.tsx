import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { ApiService } from 'src/services/ApiService';
import { useEffect, useState } from 'react';
import { OrganizationActionForm } from './OrganizationActionForm';

import { useTranslation } from 'react-i18next';

export default function OrganizationAction() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>
          {t('Organizations')} - {t('Add Organization')}
        </title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container alignItems={'stretch'}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('Add Organization')}
          </Typography>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <OrganizationActionForm />
      </Container>
    </>
  );
}
