import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Routes, useNavigate } from 'react-router-dom';
import {
  cleanReportJSON,
  setEntireReport,
  setSaveMode
} from '../Store/reducers/report';
import { getMDMBaseUrl } from '../util';
import { mdmStoreDispatch } from '../Store';
import { useTranslation } from 'react-i18next';

function Nav({ setBeginStatus, beginStatus }) {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const navigate = useNavigate();
  const exitHandler = () => {
    setBeginStatus(false);
    navigate(getMDMBaseUrl() + '/');
  };

  const dispatch = mdmStoreDispatch();

  const beginNewHandler = () => {
    setBeginStatus(true);
    dispatch(cleanReportJSON());
  };

  const inputRef = useRef<HTMLInputElement>();

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

  const save = () => {
    dispatch(setSaveMode(true));
  };

  const navigateNewPage = (path) => {
    setBeginStatus(false);
    navigate(path);
  };

  return (
    <div className="header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="ps-3 pt-3">
          <Link to={getMDMBaseUrl() + '/'} style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
              MY DIVERSITY MANAGER™
            </h2>
          </Link>
          <h5 style={{ fontSize: '18px' }}>A decision-making framework</h5>
        </div>
        <div className="ml-auto">
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-white"
            style={{ margin: '0' }}
          >
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarm">
                <ul className="navbar-nav">
                  <li className="nav-item mx-2">
                    <Link
                      to={getMDMBaseUrl() + '/start'}
                      onClick={beginNewHandler}
                      className="nav-link text-black"
                    >
                      {t('Create New MDM')}
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      to={'/dashboards/mdm'}
                      className="nav-link text-black"
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
                  </li>
                  <li className="nav-item mx-2">
                    <div
                      onClick={() => navigateNewPage('/faqs')} // Open in a new window
                      className="nav-link text-black"
                    >
                      {t('FAQs')}
                    </div>
                  </li>
                  <li className="nav-item mx-2">
                    <div
                      onClick={() => navigateNewPage('/case-studies')}
                      className="nav-link text-black"
                    >
                      {t('Case Studies')}
                    </div>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      to={getMDMBaseUrl() + '/help'}
                      onClick={() => navigateNewPage('/help')}
                      className="nav-link text-black"
                    >
                      {t('Help')}
                    </Link>
                  </li>
                  {}
                  <li className="nav-item mx-2">
                    <button onClick={save} className="nav-link text-black">
                      {t('Save')}
                    </button>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      to={getMDMBaseUrl() + '/print'}
                      className="nav-link text-black"
                    >
                      {t('Print')}
                    </Link>
                  </li>
                  {beginStatus && (
                    <li className="nav-item mx-2">
                      <button
                        onClick={exitHandler}
                        className="nav-link text-black"
                      >
                        {t('Exit')}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div>
        <Routes></Routes>
      </div>
    </div>
  );
}

export default Nav;
