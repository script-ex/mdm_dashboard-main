import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { setAssessTension } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { AutoGrowingInput } from '../Components/AutoGrowingInput';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

function AssesTheTensions() {
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
  document.body.dir = i18n.dir();

  const state = mdmStoreSelector(
    (state: MDMRootState) => state.report.report.assessTension
  );
  const recognizeTheMixture = mdmStoreSelector(
    (state: MDMRootState) => state.report.report.recognizeTheMixture
  );

  let persons = recognizeTheMixture?.values?.map((e) => e.mix).filter((e) => e);

  if (!persons) {
    persons = [];
  }
  let initValue = Array.of(persons.length).map(() => {
    return {
      tension: '',
      feelings: ''
    };
  });
  if (state.values.length) {
    initValue = JSON.parse(JSON.stringify(state.values));
    if (initValue.length < persons.length) {
      for (let i = initValue.length; i < persons.length; i++) {
        initValue.push({
          tension: '',
          feelings: ''
        });
      }
    }
  }
  const [values, setValues] = useState(initValue);

  useEffect(() => {}, [persons]);

  const handleRowChange = (tableIndex, rowIndex, value) => {
    let updatedValues = JSON.parse(JSON.stringify(values));
    if (tableIndex === 1) {
      updatedValues[rowIndex].tension = value;
    } else if (tableIndex === 2) {
      updatedValues[rowIndex].feelings = value;
    }

    setValues([...updatedValues]);
    dispatch(
      setAssessTension({
        values: [...updatedValues]
      })
    );
  };

  const addRow = () => {
    setValues((prevValues) => [...prevValues, { tension: '', feelings: '' }]);
  };

  const deleteRow = (rowIndex) => {
    const newValues = values.filter((_, index) => index !== rowIndex);
    setValues(newValues);
  };

  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();

  const gotoNext = () => {
    dispatch(
      setAssessTension({
        values: values
      })
    );
    navigate(getMDMBaseUrl() + '/identify-the-requirements');
  };

  const isDisabled =
    !values.length ||
    !values
      .map((e) => e.tension.length > 0 || e.feelings.length > 0)
      .reduce((a, b) => a || b);

  return (
    <div className="container">
      <h1>{t('Assess The Tensions')}</h1>
      <br />
      <div>
        <p>
          {t(
            'MDM Tension is the feeling of pressure or tautness we experience when faced with a situation'
          )}
        </p>
        <p>
          {t(
            'MDM Enter your information below, then click Continue to proceed'
          )}
        </p>
      </div>
      <div className="row gx-0">
        <div className="col">
          <p>{t('Who is in the mix?')}</p>
        </div>
        <div className="col">
          <p>
            {t('What are the causes of tension?')}
            <br />
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            {t('What feelings, stresses are being experienced?')}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">
          <br />
          <div
            className="table-container table-bordered"
            style={{
              borderWidth: '0px'
            }}
          >
            <table
              className="table table-bordered"
              style={{
                borderWidth: '0px'
              }}
            >
              <tbody
                style={{
                  border: 'none'
                }}
              >
                {values.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      height: '45.5px',
                      border: '0px'
                    }}
                  >
                    <th
                      scope="row"
                      style={{
                        height: 'min-content',
                        width: '25%',
                        border: '0px'
                      }}
                    >
                      {persons[index]
                        ? persons[index]
                        : 'Person ' + (index + 1)}
                    </th>
                    <td
                      className="p-0"
                      style={{
                        height: 'min-content',
                        width: '25%'
                      }}
                    >
                      <AutoGrowingInput
                        disabled={isViewMode}
                        className="p-2 no-border-input"
                        type="text"
                        value={row.tension}
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
                        width: '25%'
                      }}
                    >
                      <AutoGrowingInput
                        disabled={isViewMode}
                        className="p-2 no-border-input"
                        value={row.feelings}
                        onChange={(e) =>
                          handleRowChange(2, index, e.target.value)
                        }
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td
                      style={{
                        marginTop: 'auto',
                        marginLeft: '2rem',
                        width: '100%',
                        border: 'none'
                      }}
                    >
                      <button
                        disabled={isViewMode}
                        className="btn btn-secondary btn-sm danger-button"
                        onClick={() => deleteRow(index)}
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
      </div>
      <div className="add-row-button">
        <button
          disabled={isViewMode}
          onClick={addRow}
          className="primary-button text-white p-2 "
          style={{ borderRadius: '5px' }}
          type="button"
        >
          {t('Add Row')}
        </button>
      </div>
      <br />
      <br />
      <p>
        <b>{t('Note')}:</b>{' '}
        {t(
          'If you are having difficulty identifying the causes of tension for others'
        )}
      </p>
      <br />
      <a href="mailto:test@test.com">Ask the Coach</a>
      <br />
      <br />
      <div className="continue-button">
        <button
          disabled={isDisabled}
          onClick={gotoNext}
          className="btn btn-secondary primary-button"
          type="submit"
        >
          Continue
        </button>
      </div>

      <br />
      <br />
      <p>{t('Click ? above for guidance from the MDM Virtual Coach.')}</p>
      <br />
    </div>
  );
}

export default AssesTheTensions;
