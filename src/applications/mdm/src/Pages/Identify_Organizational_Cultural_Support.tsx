import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIdentifyOrganizationalCulturalSupport } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { AutoGrowingInput } from '../Components/AutoGrowingInput';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

function IdentifyOrganizationalCulturalSupports() {
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
  const { t } = useTranslation();

  const state = mdmStoreSelector(
    (state: MDMRootState) =>
      state.report.report.identifyOrganizationalCulturalSupport
  );

  const [values, setValues] = useState(
    state.values.length > 0
      ? JSON.parse(JSON.stringify(state.values))
      : [
          {
            factor: '',
            capitalize: ''
          },
          {
            factor: '',
            capitalize: ''
          },
          {
            factor: '',
            capitalize: ''
          }
        ]
  );

  const handleAddRow = () => {
    setValues([
      ...values,
      {
        factor: '',
        capitalize: ''
      }
    ]);
  };

  const handleDeleteRow = (rowIndex) => {
    values.splice(rowIndex, 1);
    setValues([...values]);
    dispatch(
      setIdentifyOrganizationalCulturalSupport({
        values: [...values]
      })
    );
  };

  const handleRowChange = (tableIndex, rowIndex, value) => {
    let updatedValues = JSON.parse(JSON.stringify(values));
    if (tableIndex === 1) {
      updatedValues[rowIndex].factor = value;
    } else if (tableIndex === 2) {
      updatedValues[rowIndex].capitalize = value;
    }

    setValues([...updatedValues]);
    dispatch(
      setIdentifyOrganizationalCulturalSupport({
        values: [...updatedValues]
      })
    );
  };

  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();

  const gotoNext = () => {
    dispatch(
      setIdentifyOrganizationalCulturalSupport({
        values: values
      })
    );
    navigate(getMDMBaseUrl() + '/identify-organizational-cultural-barriers');
  };

  const isDisabled =
    !values.length ||
    !values
      .map((e) => e.factor.length > 0 || e.capitalize.length > 0)
      .reduce((a, b) => a || b);

  return (
    <div className="container">
      <h1> {t('Identify Organizational Cultural Supports')}</h1>
      <br></br>
      <div>
        <p>
          {t(
            'Organizational cultural supports are those factors embedded in the way'
          )}
        </p>
        <p>
          {t('Enter your information below, then click Continue to proceed.')}
        </p>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {t(
              'What organizational cultural factors may support your proposed actions?'
            )}{' '}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            How might you capitalize on them?<br></br>
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row gx-0">
        <div className="col-12">
          <table
            className="table table-bordered"
            style={{
              border: 'none'
            }}
          >
            <tbody>
              {values.map((row, index) => (
                <tr className="border-none" key={index}>
                  <td
                    style={{
                      width: '33.33%'
                    }}
                    className="p-0"
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.factor}
                      onChange={(e) =>
                        handleRowChange(1, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    style={{
                      width: '33.33%'
                    }}
                    className="p-0"
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.capitalize}
                      onChange={(e) =>
                        handleRowChange(2, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    className="border-none"
                    style={{
                      width: '33.33%'
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

export default IdentifyOrganizationalCulturalSupports;
