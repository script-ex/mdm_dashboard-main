import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import './i18n/config';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import { rootStoreContext, store } from './store';
import { Suspense, useEffect, useState } from 'react';
import { ApiService } from './services/ApiService';

function App() {
  const content = useRoutes(router);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      ApiService.startService();
      setLoaded(true);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback="loading">
      <Provider store={store} context={rootStoreContext}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {content}
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
}
export default App;
