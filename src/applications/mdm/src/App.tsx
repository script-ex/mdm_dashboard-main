import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Main from './Components/Main';
import FAQs from './Pages/FAQs';
import MDMTips from './Pages/MDM_Tips';
import WorkplaceCaseStudy from './Pages/WorkplaceCaseStudy';
import Frontpage from './Pages/Frontpage';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import LetsBegin from './Pages/Lets_Begin';
import IdentifyTheIssue from './Pages/Identify_The_Issue';
import RecognizeTheMixture from './Pages/Recognize_The_Mixture';
import AssesTheTensions from './Pages/Asses_The_Tension';
import IdentifyOrganizationalCulturalBarriers from './Pages/Identify_Organizational_Cultural_Barriers';
import IdentifyTheRequirements from './Pages/Identify_The_Requirements';
import ProposeActions from './Pages/Propose_Action';
import IdentifyOrganizationalCulturalSupports from './Pages/Identify_Organizational_Cultural_Support';
import PlanYourAction from './Pages/Plan_Your_Action';
import Congratulations from './Pages/Congratulations';
import { Print } from './Pages/Print';
import { SavePopup } from './Components/SavePopup';
import { ApiService } from './Service/ApiService';
import { Provider } from 'react-redux';
import {
  setEntireReport,
  setViewMode as setViewModeMDM
} from './Store/reducers/report';
import {
  MDMRootState,
  mdmStore,
  mdmStoreContext,
  mdmStoreDispatch,
  mdmStoreSelector
} from './Store';
import { getMDMBaseUrl, setMDMId } from './util';
import { RootState, rootStoreDispatch, rootStoreSelector } from 'src/store';
import { debounce } from '@mui/material';
import {
  setIsSurveyOpen,
  setIsSurveySessionSaving,
  setSurveySessionName,
  setViewMode
} from 'src/store/reducer/survey-session';
// import Lets_Begin from "./Pages/Lets_Begin"

function App() {
  const currentUser = rootStoreSelector((state: RootState) => state.auth.user);
  const [hasBegan, setHasBegan] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = mdmStoreDispatch();
  const rootDispatch = rootStoreDispatch();
  const mdmState = mdmStoreSelector(
    (state: MDMRootState) => state.report.report
  );

  useEffect(() => {
    ApiService.startService();
    return () => {
      rootDispatch(
        setIsSurveyOpen({
          isSurveyOpen: false
        })
      );
    };
  }, [rootDispatch]);

  const { mdmId } = useParams();
  setMDMId(mdmId);

  const sessionName = rootStoreSelector(
    (state: RootState) => state.surveySession.surveySessionName
  );

  useEffect(() => {
    if (mdmId && mdmId !== 'home') {
      ApiService.getMDMById(mdmId).then((res) => {
        const { data } = res.data;

        rootDispatch(
          setSurveySessionName({
            surveySessionName: data.reportName
          })
        );
        const session = data;

        const amIEditor =
          currentUser?.isSuperAdmin ||
          session.userId === currentUser.id ||
          session?.sharedWithUsers?.find(
            (user) => user.userId === currentUser.id && user.role === 'EDITOR'
          );

        dispatch(setEntireReport(data.sessionObject));

        dispatch(setViewModeMDM(!amIEditor));
        rootDispatch(
          setViewMode({
            viewMode: !amIEditor
          })
        );

        rootDispatch(
          setIsSurveyOpen({
            isSurveyOpen: true
          })
        );

        // navigate(getMDMBaseUrl() + '/start');
      });
    }
  }, [mdmId, rootDispatch, currentUser?.id]);

  const debouncedUpdateName = useCallback(
    debounce((newSessionName) => {
      if (!mdmId || mdmId === 'home') {
        return;
      }
      rootDispatch(
        setIsSurveySessionSaving({
          isSaving: true
        })
      );
      ApiService.updateMdmSessionName(mdmId, newSessionName).then((res) => {
        rootDispatch(setIsSurveySessionSaving({ isSaving: false }));
      });
    }, 500),
    [mdmId]
  );
  useEffect(() => {
    if (sessionName) {
      debouncedUpdateName(sessionName);
    }
  }, [sessionName]);

  const isSurveySaving = rootStoreSelector(
    (root: RootState) => root.surveySession.isSaving
  );

  const updateSession = useCallback((sessionJson) => {
    ApiService.updateMdmSession(mdmId, sessionJson).then((res) => {
      rootDispatch(setIsSurveySessionSaving({ isSaving: false }));
    });
  }, []);

  const reportJson = JSON.stringify(mdmState);

  useEffect(() => {
    if (isSurveySaving) {
      updateSession(mdmState);
    }
  }, [isSurveySaving, reportJson]);

  // const debouncedUpdateSession = useCallback(
  //   debounce((sessionJson) => {
  //     rootDispatch(
  //       setIsSurveySessionSaving({
  //         isSaving: true
  //       })
  //     );
  //     ApiService.updateMdmSession(mdmId, sessionJson).then((res) => {
  //       rootDispatch(setIsSurveySessionSaving({ isSaving: false }));
  //     });
  //   }, 2000),
  //   []
  // );

  // const reportJson = JSON.stringify(mdmState);

  // useEffect(() => {
  //   if (reportJson) {
  //     debouncedUpdateSession(mdmState);
  //   }
  // }, [reportJson]);

  const setBeginStatus = (status) => {
    setHasBegan(status);
  };

  return (
    <>
      <div>
        <div className="header no-print">
          <Header setBeginStatus={setBeginStatus} beginStatus={hasBegan} />
        </div>
        <div className="home">
          <Routes>
            <Route path={''} element={<Frontpage />} />
            <Route path={'/faqs'} element={<FAQs />} />
            <Route path={'/help'} element={<MDMTips />} />
            <Route path={'/case-studies'} element={<WorkplaceCaseStudy />} />
            <Route
              path={'/'}
              element={<Main setBeginStatus={setBeginStatus} />}
            />
            <Route path={'/print'} element={<Print />} />

            <Route path={''} element={<Home />}>
              <Route element={<Frontpage />} path={'start'} />
              <Route element={<LetsBegin />} path={'lets-begin'} />
              <Route
                element={<IdentifyTheIssue />}
                path={'identify-the-issue'}
              />
              <Route
                element={<RecognizeTheMixture />}
                path={'recognize-the-mixture'}
              />
              <Route
                element={<AssesTheTensions />}
                path={'assess-the-tension'}
              />
              <Route
                element={<IdentifyOrganizationalCulturalBarriers />}
                path={'identify-organizational-cultural-barriers'}
              />
              <Route
                element={<IdentifyTheRequirements />}
                path={'identify-the-requirements'}
              />
              <Route element={<ProposeActions />} path={'propose-action'} />
              <Route
                element={<IdentifyOrganizationalCulturalSupports />}
                path={'identify-organizational-cultural-supports'}
              />
              <Route element={<PlanYourAction />} path={'plan-your-action'} />
              <Route element={<Congratulations />} path={'congratulations'} />
            </Route>
          </Routes>
        </div>
      </div>
      <SavePopup />
    </>
  );
}

const MDMApp = () => {
  return (
    <Provider store={mdmStore} context={mdmStoreContext}>
      <App />
    </Provider>
  );
};

export default MDMApp;

// <div className="main">
//           <Main />
//         </div>
