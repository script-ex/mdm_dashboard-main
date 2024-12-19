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
import { useEffect, useState } from 'react';
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

export function LicensePurchaseActionForm() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    ApiService.getOrganizations().then((organizations) => {
      setOrganizations(organizations.data?.data);
    });
  }, []);

  return (
    <>
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await ApiService.createLicensePurchase(values);
            navigate(ROUTES.LICENSE_PURCHASE.OVERVIEW);
          } catch (e) {
            console.error(e);
          }
          setSubmitting(false);
        }}
        initialValues={{
          organizationId: '',
          product: '',
          amount: 0,
          status: true
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.organizationId) {
            errors.organizationId = 'Required';
          }
          if (!values.product) {
            errors.product = 'Required';
          }
          if (!values.amount && values.amount > 0) {
            errors.amount = 'Required';
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="organization-label">Organization</InputLabel>
                  <Select
                    labelId="organization-label"
                    id="organization"
                    value={values.organizationId}
                    onChange={(e) => {
                      setFieldValue('organizationId', e.target.value);
                    }}
                    input={<OutlinedInput label="Organization" />}
                  >
                    {organizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name} ({org.id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="product-label">Product</InputLabel>
                  <Select
                    labelId="product-label"
                    id="product"
                    value={values.product}
                    onChange={(e) => {
                      setFieldValue('product', e.target.value);
                    }}
                    input={<OutlinedInput label="Product" />}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  variant="outlined"
                  type="number"
                />
              </Grid>

              <Grid item xs={12} display={'flex'} alignItems={'center'} gap={2}>
                <Typography>Status</Typography>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
