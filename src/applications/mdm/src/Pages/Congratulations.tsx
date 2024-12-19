import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './pages.css';
import { useSelector } from 'react-redux';
import { getMDMBaseUrl } from '../util';
import { MDMRootState, mdmStoreSelector } from '../Store';
import { ApiService } from '../Service/ApiService';
import { RootState, rootStoreSelector } from 'src/store';
import {useTranslation} from 'react-i18next';

function Congratulations() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  const state = mdmStoreSelector((state: MDMRootState) => state.report.report);
  const fileName = rootStoreSelector(
    (state: RootState) => state.surveySession.surveySessionName
  );
  const { mdmId } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const print = async () => {
    setIsLoading(true);
    const response = await ApiService.getMDMReport(mdmId);
    const url = response.data.data;

    // open url on new tab
    const win = window.open(url, '_blank');

    setIsLoading(false);
  };

  return (
    <div>
      <div className="container">
        <h1>{t("Congratulations!")}</h1>
        <br />
        <p>
          {t("You have successfully completed the My Diversity Manager™ decision-making framework.")}
        </p>
        <p>
          {t("Click the ")}<b>{t("Print")}</b> {t("button below to view and print the populated MDM worksheet.")}
        </p>
        <p>
          {t("You may exit by closing this window")}
          {/* or clicking the <b>Exit</b> link located in the upper menu bar. */}
        </p>
        <br />
        <div className="new-button-container">
          <button
            disabled={isLoading}
            onClick={print}
            className="btn btn-secondary primary-button"
          >
            {t("Print")}
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Congratulations;
