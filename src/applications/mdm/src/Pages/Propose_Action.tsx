import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProposeAction } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { AutoGrowingInput } from '../Components/AutoGrowingInput';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

function ProposeActions() {
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
    (state: MDMRootState) => state.report.report.proposeAction
  );

  const [values, setValues] = useState(
    state.values.length > 0
      ? JSON.parse(JSON.stringify(state.values))
      : [
          {
            action: '',
            result: ''
          },
          {
            action: '',
            result: ''
          },
          {
            action: '',
            result: ''
          }
        ]
  );

  const handleAddRow = () => {
    setValues([
      ...values,
      {
        action: '',
        result: ''
      }
    ]);
  };

  const handleDeleteRow = (rowIndex) => {
    values.splice(rowIndex, 1);
    setValues([...values]);
    dispatch(
      setProposeAction({
        values: [...values]
      })
    );
  };

  const handleRowChange = (tableIndex, rowIndex, value) => {
    let updatedValues = JSON.parse(JSON.stringify(values));
    if (tableIndex === 1) {
      updatedValues[rowIndex].action = value;
    } else if (tableIndex === 2) {
      updatedValues[rowIndex].result = value;
    }

    setValues([...updatedValues]);
    dispatch(
      setProposeAction({
        values: [...updatedValues]
      })
    );
  };

  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();

  const gotoNext = () => {
    dispatch(
      setProposeAction({
        values: values
      })
    );
    navigate(getMDMBaseUrl() + '/identify-organizational-cultural-supports');
  };

  const isDisabled =
    !values.length ||
    !values
      .map((e) => e.action.length > 0 || e.result.length > 0)
      .reduce((a, b) => a || b);

  return (
    <div className="container">
      <h1> {t('Propose Actions')}</h1>
      <br></br>
      <div>
        <p>
          {t(
            'Consider actions that might have been taken in the past and what the'
          )}
        </p>
        <p>
          {t('Enter your information below, then click Continue to proceed.')}
        </p>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {t('What actions might offer a productive outcome?')}
            <br></br>
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            {t(
              'What might be the results of these actions (intended and unintended consequences)?'
            )}{' '}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row gx-0">
        <div className="col">
          <table
            className="table table-bordered"
            style={{
              border: 'none'
            }}
          >
            <tbody className="border-none">
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
                      value={row.action}
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
                      value={row.result}
                      onChange={(e) =>
                        handleRowChange(2, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    style={{
                      width: '33.33%'
                    }}
                    className="border-none"
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

export default ProposeActions;
