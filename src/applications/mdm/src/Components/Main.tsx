import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cleanReportJSON } from '../Store/reducers/report';
import { getMDMBaseUrl } from '../util';
import { mdmStoreDispatch } from '../Store';
import { useTranslation } from 'react-i18next';

function Main({ setBeginStatus }) {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();
  const beginHandler = () => {
    setBeginStatus(true);
    dispatch(cleanReportJSON());
    navigate(getMDMBaseUrl() + '/start');
  };
  const handleFAQsClick = (e) => {
    e.preventDefault();
    navigate(getMDMBaseUrl() + '/faqs');
  };
  return (
    <div className="main h-100">
      <div className="">
        <div>
          <div>
            <div className="header">{/* Your existing header content */}</div>

            <div className="container">
              <div className="row mt-2 pt-4">
                <div className="col-lg-6">
                  <div className="d-flex justify-content-between mt-3">
                    <h2>{t('Welcome to')} My Diversity Manager</h2>
                    <br></br>
                    <button
                      onClick={beginHandler}
                      className="btn btn-success position-fixed top-10% end-0 m-3"
                    >
                      {t('Lets Begin')}
                    </button>
                  </div>
                  <div>
                    <p>
                      {t(
                        'My Diversity Manager™ (MDM) is a step-by-step decision-making framework'
                      )}
                    </p>
                    <br></br>
                    <p>{t('MDM Through a series of questions at each step')}</p>
                    <br></br>
                    <p>
                      {t(
                        "Click the 'Let's Begin' button to start using the MDM"
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 larger-image-container">
                  <img
                    src="/th.jpg"
                    alt="Your Image"
                    className="img-fluid larger-image"
                  />
                </div>
              </div>
            </div>

            <div className="container text-center">
              <div className="row">
                <div className="col">
                  <div className="square-box">
                    <p>{t('Your Virtual MDM Coach')}</p>
                    <p>
                      {t('As you answer questions during each step of MDM')}
                    </p>
                    <a href="#">learn more</a>
                  </div>
                  <div>
                    <span className="border"></span>
                  </div>
                </div>
                <div className="col">
                  <div className="square-box">
                    <p>{t('MDM Case Studies')}</p>
                    <p>{t('MDM can be used for many different situations')}</p>
                    <Link to="case-studies">{t('learn more')}</Link>
                  </div>
                </div>
                <div className="col">
                  <div className="square-box">
                    <p>{t('Frequently Asked Questions')} </p>
                    <p>
                      {t('A comprehensive list of frequently asked questions')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
