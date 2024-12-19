import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/routes';
import { ApiService } from 'src/services/ApiService';
import { useTranslation } from 'react-i18next';

const accessProducts = [
  {
    display: 'My Diversity Manager',
    value: 'MDM'
  },
  {
    display: 'Personal Diversity Paradigm',
    value: 'PDP'
  }
];

export function OrganizationActionForm() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  return (
    <>
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await ApiService.createOrganization(values);
            navigate(ROUTES.ORGANIZATION.OVERVIEW);
          } catch (e) {
            console.error(e);
          }
          setSubmitting(false);
        }}
        initialValues={{
          name: '',
          accessProducts: [],
          status: true
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container maxWidth="sm" gap={2}>
              <Grid p={0} item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="accessProducts-label">
                    {t('Access Products')}
                  </InputLabel>
                  <Select
                    labelId="accessProducts-label"
                    id="accessProducts"
                    multiple
                    value={values.accessProducts}
                    onChange={(e) => {
                      setFieldValue('accessProducts', e.target.value);
                    }}
                    input={<OutlinedInput label="Access Products" />}
                    renderValue={(selected) =>
                      (selected as string[]).join(', ')
                    }
                  >
                    {accessProducts.map((accessProduct) => (
                      <MenuItem
                        key={accessProduct.value}
                        value={accessProduct.value}
                      >
                        {accessProduct.display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display={'flex'} alignItems={'center'} gap={2}>
                <Typography>{t('Status')}</Typography>
                <FormControl fullWidth>
                  <Switch
                    checked={values.status}
                    onChange={handleChange}
                    name="status"
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  {t('Submit')}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
