import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIdentifyIssue, setLockNavigation } from '../Store/reducers/report';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl } from '../util';
import { useTranslation } from 'react-i18next';
import { rootStoreDispatch } from 'src/store';
import { setIsSurveySessionSaving } from 'src/store/reducer/survey-session';

const IdentifyTheIssue = () => {
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
  const identifyIssue = mdmStoreSelector(
    (state: MDMRootState) => state.report.report.identifyIssue
  );
  const { t, i18n } = useTranslation();

  const [comment, setComment] = useState(identifyIssue.value || '• ');
  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();
  const handleCommentChange = (event) => {
    setComment(event.target.value);
    dispatch(
      setIdentifyIssue({
        value: event.target.value
      })
    );
  };

  useEffect(() => {
    dispatch(setLockNavigation(false));
  }, [dispatch]);

  const handleSubmit = (event) => {
    dispatch(
      setIdentifyIssue({
        value: comment
      })
    );
    navigate(getMDMBaseUrl() + '/recognize-the-mixture');
  };

  const handleBulletPoints = (e) => {
    if (e.key === 'Enter') {
      setComment(comment + '•' + ' ');
    }
  };

  return (
    <div className="container">
      <h1>{t('Identify the Issue')}</h1>
      <div className="newbox">
        {/* Existing content */}
        <p>
          {t(
            'The issue is a situation or challenge that is a source of tension or complexity in your workforce, workplace, or marketplace.'
          )}
          <ul>
            <li>
              <b>{t('Workforce')}</b>:{' '}
              {t('me and another person; my group and another group')}
            </li>
            <li>
              <b>{t('Workplace')}</b>:{' '}
              {t(
                'me and another entity (policy, practice, system); my group and another entity (policy, practice, system)'
              )}
            </li>
            <li>
              <b>{t('Marketplace')}</b>:{' '}
              {t(
                'me and a community group, client, customer, vendor, supplier, distributor, social interaction; my group and one (or more) of the above.'
              )}
            </li>
          </ul>
        </p>
        <p>
          {t(
            'Consider the following: What are the related facts and circumstances?'
          )}
        </p>
        <p>
          <b>{t('Note')}</b>:{' '}
          {t(
            'if the issue involves safety, danger, or a Human Resource legal matter'
          )}
        </p>
        <p>
          {t("Ask the Coach for information on how to frame your issue.{' '}")}
          <a href="mailto:test@test.com">{t('Ask the Coach')}</a>
        </p>
        <p>
          {t('Enter your information below, then click Continue to proceed.')}
        </p>

        {/* Comment box */}
        <form onSubmit={handleSubmit}>
          <textarea
            disabled={isViewMode}
            value={comment}
            onChange={handleCommentChange}
            onKeyUp={handleBulletPoints}
            className="w-100 p-3"
            style={{ height: '300px' }} // Set the width to 100%
          ></textarea>
          <button
            onClick={handleSubmit}
            disabled={!comment.trim().length}
            className="btn mt-2 btn-secondary primary-button"
            type="submit"
          >
            {t('Continue')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdentifyTheIssue;
