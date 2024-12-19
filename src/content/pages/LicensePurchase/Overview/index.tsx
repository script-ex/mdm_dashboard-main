import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { ApiService } from 'src/services/ApiService';
import { LicensePurchaseTable } from './LicensePurchaseTable';
import { useEffect, useState } from 'react';
import AddTwoTone from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/routes';

import { useTranslation } from 'react-i18next';
import { RootState, rootStoreSelector } from 'src/store';

export default function LicensePurchaseOverview() {
  const { t } = useTranslation();
  const currentUser = rootStoreSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const handleNewLicensePurchaseClick = () => {
    navigate(ROUTES.LICENSE_PURCHASE.NEW);
  };

  return (
    <>
      <Helmet>
        <title>
          {t('Licenses')} - {t('Overview')}
        </title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('License Overview')}
          </Typography>
          {currentUser && currentUser.isSuperAdmin && (
            <ButtonBase
              onClick={() => handleNewLicensePurchaseClick()}
              sx={{ ml: 'auto' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px 16px'
                }}
              >
                <AddTwoTone />

                <Typography mx={1} variant="subtitle2">
                  {t('Add')}
                </Typography>
              </div>
            </ButtonBase>
          )}
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <LicensePurchaseTable />
      </Container>
    </>
  );
}
