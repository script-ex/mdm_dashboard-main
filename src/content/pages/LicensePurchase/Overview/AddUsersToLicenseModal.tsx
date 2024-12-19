import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { ApiService } from 'src/services/ApiService';

import { useTranslation } from 'react-i18next';

// document.body.dir = i18n.dir();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4
};

export function AddUsersToLicenseModal({ licensePurchase, handleClose }) {
  const { t, i18n } = useTranslation();

  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    ApiService.getUsersByOrganizationIdWithoutLicense(
      licensePurchase.organizationId,
      licensePurchase.id
    ).then((response) => {
      setUsers(response.data.data);
    });
  }, [licensePurchase.organizationId]);
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Add Users for <b>{licensePurchase.product}</b> License
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        There are <b>{licensePurchase.left}</b> licenses left for this product.
      </Typography>
      <Formik
        initialValues={{
          users: []
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await ApiService.addUsersToLicensePurchase(
              values.users,
              licensePurchase.id
            );
            handleClose();
          } catch (e) {
            console.error(e);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Users</InputLabel>
              <Select
                multiple
                label="Users"
                value={values.users}
                onChange={(e) => {
                  setFieldValue('users', e.target.value);
                }}
                input={<OutlinedInput label="Users" />}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Button disabled={isSubmitting} type="submit">
              {t('Submit')}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
