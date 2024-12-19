import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRecognizeTheMixture } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { AutoGrowingInput } from '../Components/AutoGrowingInput';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

function RecognizeTheMixture() {
  const rootDispatch = rootStoreDispatch();
  useEffect(() => {
    return () => {
      rootDispatch(
        setIsSurveySessionSaving({
          isSaving: true
        })
      );
    };
  }, []);
  const isViewMode = mdmStoreSelector(
    (state: MDMRootState) => state.report.viewMode
  );
  const { t, i18n } = useTranslation();

  const state = mdmStoreSelector(
    (state: MDMRootState) => state.report.report.recognizeTheMixture
  );

  const [values, setValues] = useState(
    state.values.length > 0
      ? JSON.parse(JSON.stringify(state.values))
      : [
          {
            mix: '',
            interest: ''
          },
          {
            mix: '',
            interest: ''
          },
          {
            mix: '',
            interest: ''
          }
        ]
  );

  const handleAddRow = () => {
    setValues([
      ...values,
      {
        mix: '',
        interest: ''
      }
    ]);
  };

  const handleDeleteRow = (rowIndex) => {
    values.splice(rowIndex, 1);
    setValues([...values]);
    dispatch(
      setRecognizeTheMixture({
        values: values
      })
    );
  };

  const handleRowChange = (tableIndex, rowIndex, value) => {
    let updatedValues = JSON.parse(JSON.stringify(values));
    if (tableIndex === 1) {
      updatedValues[rowIndex].mix = value;
    } else if (tableIndex === 2) {
      updatedValues[rowIndex].interest = value;
    }

    setValues([...updatedValues]);
    dispatch(
      setRecognizeTheMixture({
        values: updatedValues
      })
    );
  };

  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();

  const gotoNext = () => {
    dispatch(
      setRecognizeTheMixture({
        values: values
      })
    );
    navigate(getMDMBaseUrl() + '/assess-the-tension');
  };

  const isDisabled =
    !values.length ||
    !values
      .map((e) => e.mix.length > 0 || e.interest.length > 0)
      .reduce((a, b) => a || b);

  return (
    <div className="container">
      <h1>{t('Recognize the Mixture')}</h1>
      <br></br>
      <div>
        <p>
          {t(
            'Who are (or should be) the parties are involved? These parties can be'
          )}
        </p>
        <p>
          {t('Enter your information below, then click Continue to proceed.')}
        </p>
      </div>
      <div className="row gx-0">
        <div className="col">
          <p>
            {t('Who is in the mix?')} <br />
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            {t("What are the interests/perspectives?{' '}")}
            <br />
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">
          <table
            className="table table-bordered"
            style={{
              borderWidth: '0px'
            }}
          >
            <tbody>
              {values.map((row, index) => (
                <tr
                  style={{
                    border: 'none'
                  }}
                  key={index}
                >
                  <td
                    className="p-0"
                    style={{
                      height: 'min-content',
                      width: '33.3%'
                    }}
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.mix}
                      onChange={(e) =>
                        handleRowChange(1, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    className="p-0"
                    style={{
                      height: 'min-content',
                      width: '33.3%'
                    }}
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.interest}
                      onChange={(e) =>
                        handleRowChange(2, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    className="p-0 d-block"
                    style={{
                      border: 'none'
                    }}
                  >
                    <div
                      style={{
                        marginTop: 'auto',
                        marginLeft: '2rem',
                        width: '100%'
                      }}
                    >
                      <button
                        disabled={isViewMode}
                        className="btn btn-secondary btn-sm danger-button"
                        onClick={() => handleDeleteRow(index)}
                        style={{ fontSize: '12px' }}
                      >
                        {t('Delete Row')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        disabled={isViewMode}
        className="primary-button text-white p-2 "
        style={{ borderRadius: '5px' }}
        onClick={handleAddRow}
      >
        {t('Add Row')}
      </button>
      <br />
      <br />
      <p>{t('*Enter each individual or group on separate rows')}</p>
      <br />
      <div className="continue-button">
        <button
          onClick={gotoNext}
          disabled={isDisabled}
          className="btn btn-secondary primary-button"
          type="submit"
        >
          {t('Continue')}
        </button>
      </div>
      <br />
      <br />
      <p>{t('Click ? above for guidance from the MDM Virtual Coach.')}</p>
    </div>
  );
}

export default RecognizeTheMixture;
