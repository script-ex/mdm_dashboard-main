import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlanYourAction } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { AutoGrowingInput } from '../Components/AutoGrowingInput';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

function PlanYourAction() {
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
  const allState = mdmStoreSelector(
    (state: MDMRootState) => state.report.report
  );

  const state = allState.planYourAction;
  const actions = allState.proposeAction.values;

  const [selectedActions, setSelectedActions] = useState(
    state.selectedActions && state.selectedActions
      ? JSON.parse(JSON.stringify(state.selectedActions))
      : []
  );

  const [values, setValues] = useState(
    state.values.length
      ? JSON.parse(JSON.stringify(state.values))
      : [
          {
            task: '',
            resource: '',
            date: ''
          },
          {
            task: '',
            resource: '',
            date: ''
          },
          {
            task: '',
            resource: '',
            date: ''
          }
        ]
  );

  const toggleAction = (action) => {
    if (selectedActions.includes(action)) {
      const index = selectedActions.indexOf(action);
      selectedActions.splice(index, 1);
      setSelectedActions([...selectedActions]);
      dispatch(
        setPlanYourAction({
          values: [...values],
          selectedActions: [...selectedActions]
        })
      );
    } else {
      setSelectedActions([...selectedActions, action]);
      dispatch(
        setPlanYourAction({
          values: [...values],
          selectedActions: [...selectedActions, action]
        })
      );
    }
  };

  const handleAddRow = () => {
    setValues([
      ...values,
      {
        task: '',
        resource: '',
        date: ''
      }
    ]);
  };

  const handleDeleteRow = (rowIndex) => {
    let _values = [...values];
    _values.splice(rowIndex, 1);
    setValues([..._values]);
    dispatch(
      setPlanYourAction({
        values: [..._values],
        selectedActions
      })
    );
  };

  const handleRowChange = (tableIndex, rowIndex, value) => {
    let updatedValues = JSON.parse(JSON.stringify(values));
    if (tableIndex === 1) {
      updatedValues[rowIndex].task = value;
    } else if (tableIndex === 2) {
      updatedValues[rowIndex].resource = value;
    } else if (tableIndex === 3) {
      updatedValues[rowIndex].date = value;
    }

    setValues([...updatedValues]);
    dispatch(
      setPlanYourAction({
        values: [...updatedValues],
        selectedActions
      })
    );
  };

  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();

  const gotoNext = () => {
    dispatch(
      setPlanYourAction({
        values: values,
        selectedActions
      })
    );
    navigate(getMDMBaseUrl() + '/congratulations');
  };

  const isDisabled =
    !values.length ||
    !values
      .map(
        (e) =>
          (e.task && e.task.length > 0) ||
          (e.resource && e.resource.length > 0) ||
          e.date.length > 0
      )
      .reduce((a, b) => a || b);

  return (
    <div className="container">
      <h1>{t('Plan Your Action')}</h1>
      <br></br>
      <div>
        <p>
          {t(
            'Of the following actions you have identified that are listed below,'
          )}
        </p>
        <ul
          style={{
            listStyleType: 'none'
          }}
        >
          {actions
            .filter((e) => e.action.length)
            .map((e) => (
              <li key={e.action}>
                <input
                  disabled={isViewMode}
                  onClick={() => toggleAction(e.action)}
                  checked={selectedActions.includes(e.action)}
                  type="checkbox"
                />{' '}
                {e.action}
              </li>
            ))}
        </ul>
        <p>
          {t(
            'Once you have selected all of the actions you plan to take, consider'
          )}
        </p>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {t('Tasks(what)')}{' '}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            {t('Resources(who)')}{' '}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col">
          <p>
            {t('Date(by when)')}{' '}
            <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col-12">
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
                      width: '25%'
                    }}
                    className="p-0"
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.task}
                      onChange={(e) =>
                        handleRowChange(1, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    style={{
                      width: '25%'
                    }}
                    className="p-0"
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.resource}
                      onChange={(e) =>
                        handleRowChange(2, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    style={{
                      width: '25%'
                    }}
                    className="p-0"
                  >
                    <AutoGrowingInput
                      disabled={isViewMode}
                      className="p-2 no-border-input"
                      type="text"
                      value={row.date}
                      onChange={(e) =>
                        handleRowChange(3, index, e.target.value)
                      }
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td
                    className="border-none"
                    style={{
                      width: '25%'
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

export default PlanYourAction;
