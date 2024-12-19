import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';

function Frontpage() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const navigateNewPage = (page) => {
    window.open(`/#/surveys/mdm/home/${page}`);
  };
  const { mdmId } = useParams();

  const getLetsBeginLink = () => {
    if (
      !mdmId ||
      mdmId === 'undefined' ||
      mdmId === 'null' ||
      mdmId === '' ||
      mdmId === 'home'
    ) {
      return getMDMBaseUrl() + '/lets-begin';
    }
    return getMDMBaseUrl() + '/identify-the-issue';
  };
  return (
    <div>
      <div className="container">
        <div className="row pt-4">
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-start mt-3">
              <div>
                <h2>
                  {t('Welcome to')} {t('My Diversity Manager')}
                </h2>
              </div>
            </div>
            <div>
              <p>
                {t(
                  'My Diversity Manager™ (MDM) is a step-by-step, decision-making'
                )}
              </p>
              <p>
                {t(
                  'Through a series of questions at each step, this tool enables'
                )}
              </p>
              <p>
                {t("Click the 'Let's Begin' button to start using the MDM.")}
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex flex-column flex-lg-row  justify-content-between mb-3">
            <div className="larger-image-container">
              <img src={'/th.jpg'} alt="Your Image" className="larger-image" />
            </div>
            <div
              style={{
                marginTop: '25px'
              }}
            >
              <Link
                to={getLetsBeginLink()}
                className="btn primary-button text-white mx-lg-3 my-3 my-lg-0"
              >
                {t("Let's Begin")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="square-box">
              <p>{t('MDM Tips')}</p>
              <p>
                {t('As you answer questions during each step of My Diversity')}
              </p>
              <div className="cursor-pointer text-blue">learn more</div>
            </div>
            <div>
              <span className="border"></span>
            </div>
          </div>
          <div className="col">
            <div className="square-box">
              <p>{t('MDM Case Studies')}</p>
              <p>
                {t(
                  'My Diversity Manager™ can be used for many different situations.'
                )}
              </p>
              <div
                className="cursor-pointer text-blue"
                onClick={() => navigateNewPage('case-studies')}
              >
                {t('learn more')}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="square-box">
              <p>{t('Frequently Asked Questions')}</p>
              <p>
                {t(
                  'A comprehensive list of frequently asked questions (FAQs) will'
                )}
              </p>

              <div
                className="cursor-pointer text-blue"
                onClick={() => navigateNewPage('faqs')}
              >
                {t('learn more')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frontpage;
