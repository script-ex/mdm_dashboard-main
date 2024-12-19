import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, ButtonBase, Modal } from '@mui/material';

import RecentOrders from './RecentOrders';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { AddTwoTone } from '@mui/icons-material';
import { ApiService } from 'src/services/ApiService';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AddNewMDMModal } from 'src/applications/mdm/common/AddNewMDMModal';
import { useState } from 'react';

function ApplicationsTransactions() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const handleNewMDM = () => {
    handleOpen();
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (response) => {
    setOpen(false);
    const mdmId = response.data.data.id;
    navigate(`/surveys/mdm/${mdmId}/identify-the-issue`);
  };
  return (
    <>
      <Helmet>
        <title>
          {t('My MDM Sessions')}- {t('Applications')}
        </title>
      </Helmet>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNewMDMModal handleClose={handleClose} />
      </Modal>

      <PageTitleWrapper>
        <Grid container>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('My MDM Sessions')}
          </Typography>
          <div
            className="d-flex"
            style={{
              marginLeft: 'auto'
            }}
          >
            <ButtonBase onClick={() => handleNewMDM()} sx={{ ml: 'auto' }}>
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
          </div>
        </Grid>
      </PageTitleWrapper>
      <Container
        style={{
          marginTop: '2rem'
        }}
        maxWidth="lg"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
