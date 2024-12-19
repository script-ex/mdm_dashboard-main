import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {useTranslation} from 'react-i18next';


function PageHeader() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('Transactions')}
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, {t('these are your recent transactions')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {t('Create transaction')}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
