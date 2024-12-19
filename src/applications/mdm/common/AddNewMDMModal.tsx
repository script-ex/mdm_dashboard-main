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

export function AddNewMDMModal({ handleClose }) {
  const { t, i18n } = useTranslation();
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Create a New My Diversity Manager
      </Typography>
      <Formik
        initialValues={{
          title: ''
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const response = await ApiService.createEmptyMDM(values.title);
            handleClose(response);
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
              <InputLabel htmlFor="title">{t('Title')}</InputLabel>
              <OutlinedInput
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                label={t('Title')}
              />
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
