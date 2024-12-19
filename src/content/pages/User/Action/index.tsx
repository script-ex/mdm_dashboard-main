import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { UserActionForm } from './UserActionForm';
// import { UserActionForm } from './UserActionForm';

import { useTranslation } from 'react-i18next';

export default function UserAction() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t('Users')} - {t('Add User')}
        </title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container alignItems={'stretch'}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('Add User')}
          </Typography>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <UserActionForm />
      </Container>
    </>
  );
}
