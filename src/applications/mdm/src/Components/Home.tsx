import './Home.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MDMRootState, mdmStoreSelector } from '../Store';
import { getMDMBaseUrl, removeBulletAndSpaces } from '../util';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const _state = mdmStoreSelector((root: MDMRootState) => root.report);
  const lockNavigation = mdmStoreSelector(
    (root: MDMRootState) => root.report.lockNavigation
  );

  const location = useLocation();

  const navigate = useNavigate();

  const navigateTo = (path) => {
    if (!lockNavigation) {
      navigate(getMDMBaseUrl() + path);
    }
  };

  const isNavigationLocked = (i) => {
    return lockNavigation;
  };
  const state = _state.report;
  if (!state) {
    return null;
  }

  const displaySidebar = !location.pathname.endsWith('/start');

  return (
    <div className="d-flex home">
      <div className="content container mt-3">
        <Outlet />
        <div className="vertical-line"></div>
      </div>
      {displaySidebar && (
        <div className="sidebar bg-white text-black">
          <ul className="nav nav-pills border border-black flex-column mb-auto px-0 mt-3">
            <li className="nav-item ms-2">
              <div
                onClick={(e) => navigateTo('/identify-the-issue')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.identifyIssue.value).length >
                  0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.identifyIssue.value).length > 0
                      ? 'sidebar-active'
                      : ''
                  } `}
                >
                  {t('Identify The Issue')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() => navigateTo('/recognize-the-mixture')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.recognizeTheMixture.values)
                  .length > 0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.recognizeTheMixture.values)
                      .length > 0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Recognize the Mixture')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() => navigateTo('/assess-the-tension')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.assessTension.values).length >
                  0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.assessTension.values).length >
                    0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Assess The Tension')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() => navigateTo('/identify-the-requirements')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.identifyRequirements.values)
                  .length > 0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.identifyRequirements.values)
                      .length > 0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Identify The Requirements')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() => navigateTo('/propose-action')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.proposeAction.values).length >
                  0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.proposeAction.values).length >
                    0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Propose Action')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() =>
                  navigateTo('/identify-organizational-cultural-supports')
                }
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(
                  state?.identifyOrganizationalCulturalSupport.values
                ).length > 0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(
                      state?.identifyOrganizationalCulturalSupport.values
                    ).length > 0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Identify Organizational Cultural Supports')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() =>
                  navigateTo('/identify-organizational-cultural-barriers')
                }
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(
                  state?.identifyOrganizationalCulturalBarrier.values
                ).length > 0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(
                      state?.identifyOrganizationalCulturalBarrier.values
                    ).length > 0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Identify Organizational Cultural Barriers')}
                </span>
              </div>
            </li>

            <li className="nav-item ms-2">
              <div
                onClick={() => navigateTo('/plan-your-action')}
                className={`nav-link text-${
                  isNavigationLocked(0) ? 'gray' : 'dark'
                } cursor-pointer`}
              >
                {removeBulletAndSpaces(state?.planYourAction.values).length >
                  0 && <span className="text-green m--2">✔ </span>}
                <span
                  className={`${
                    removeBulletAndSpaces(state?.planYourAction.values).length >
                    0
                      ? 'sidebar-active'
                      : ''
                  }`}
                >
                  {t('Plan Your Action')}
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
