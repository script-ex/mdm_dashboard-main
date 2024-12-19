import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import {
  cleanReportJSON,
  setEntireReport,
  setLockNavigation
} from '../Store/reducers/report';
import { getMDMBaseUrl } from '../util';
import { mdmStoreDispatch } from '../Store';
import { useTranslation } from 'react-i18next';
import { ApiService } from '../Service/ApiService';
import { Modal } from '@mui/material';
import { AddNewMDMModal } from '../../common/AddNewMDMModal';

function LetsBegin() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const dispatch = mdmStoreDispatch();
  const inputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLockNavigation(true));
  }, []);
  const startNew = async () => {
    dispatch(cleanReportJSON());
    handleOpen();
    // const response = await ApiService.createEmptyMDM();
    // const mdmId = response.data.data.id;
    // navigate(`/surveys/mdm/${mdmId}/identify-the-issue`);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // Handle the content of the JSON file
        try {
          const value = JSON.parse(content.toString());
          dispatch(setEntireReport(value));
          navigate(getMDMBaseUrl() + '/identify-the-issue');
        } catch (err) {
          alert('Error in parsing file');
        }
      };
      reader.readAsText(file);
    }
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (response) => {
    setOpen(false);
    const mdmId = response.data.data.id;
    navigate(`/surveys/mdm/${mdmId}/identify-the-issue`);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNewMDMModal handleClose={handleClose} />
      </Modal>
      <div className="container">
        <h1>Lets Begin</h1>
        <div className="box">
          <p>
            {t(
              'You are about to begin using the My Diversity Manager™ framework,'
            )}
          </p>
          <p>
            {t(
              'A Virtual Coach will assist you as you are completing your MDM.'
            )}
          </p>
          <p>
            {t(
              "While progressing through, you will notice this icon '?'' located"
            )}
          </p>
          <p>
            {t('Click')} <b>{t('New MDM')}</b>{' '}
            {t(
              "below to start a brand new MDM. If you have previously saved an MDM and want to update or edit it, click{' '}"
            )}
            <b>{t('Open Existing MDM')}</b>
          </p>
        </div>
        <div className="button-container">
          <button
            onClick={startNew}
            className="btn btn-secondary primary-button"
          >
            {t('New MDM')}
          </button>
          <Link
            to={'/dashboards/mdm'}
            className="btn btn-secondary primary-button"
          >
            {t('Open Existing MDM')}
          </Link>
          <input
            ref={inputRef}
            style={{ display: 'none' }}
            type="file"
            id="jsonFileInput"
            accept="application/json"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}

export default LetsBegin;
