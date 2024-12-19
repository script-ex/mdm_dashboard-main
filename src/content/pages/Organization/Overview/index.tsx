import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { ApiService } from 'src/services/ApiService';
import { OrganizationTable } from './OrganizationTable';
import { useEffect, useState } from 'react';
import AddTwoTone from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/routes';
import {useTranslation} from 'react-i18next';

export default function OrganizationOverview() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  const [organizations, setOrganizations] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    ApiService.getOrganizations().then((organizations) => {
      setOrganizations(organizations.data?.data);
    });
  }, []);

  const handleNewOrganizationClick = () => {
    navigate(ROUTES.ORGANIZATION.NEW);
  };

  return (
    <>
      <Helmet>
        <title>{t('Organizations')} - {t('Overview')}</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('Organization Overview')}
          </Typography>
          <ButtonBase
            onClick={() => handleNewOrganizationClick()}
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
                Add
              </Typography>
            </div>
          </ButtonBase>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <OrganizationTable organizations={organizations} />
      </Container>
    </>
  );
}
