import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, rootStoreSelector } from 'src/store';
import { useTranslation } from 'react-i18next';

function PageHeader() {
  const globalUser = rootStoreSelector((state: RootState) => state.auth.user);

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const user = {
    name: globalUser?.firstName ?? '',
    avatarPath: globalUser?.avatarPath ?? ''
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatarPath}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('Welcome')}, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          {t('Below you can find your survey manager')}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
