import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saveMode: false,
  viewMode: false,
  lockNavigation: true,
  lastSection: '',
  report: {
    identifyIssue: {
      value: ''
    },
    recognizeTheMixture: {
      values: []
    },
    assessTension: {
      values: []
    },
    identifyRequirements: {
      values: []
    },
    proposeAction: {
      values: []
    },
    identifyOrganizationalCulturalSupport: {
      values: []
    },
    identifyOrganizationalCulturalBarrier: {
      values: []
    },
    planYourAction: {
      values: [],
      selectedActions: []
    }
  }
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setSaveMode: (state, data) => {
      state.saveMode = data.payload;
    },
    setLockNavigation: (state, data) => {
      state.lockNavigation = data.payload;
    },
    setIdentifyIssue: (state, data) => {
      state.report.identifyIssue = data.payload;
    },
    setRecognizeTheMixture: (state, data) => {
      state.report.recognizeTheMixture = data.payload;
    },
    setAssessTension: (state, data) => {
      state.report.assessTension = data.payload;
    },
    setIdentifyRequirements: (state, data) => {
      state.report.identifyRequirements = data.payload;
    },
    setProposeAction: (state, data) => {
      state.report.proposeAction = data.payload;
    },
    setIdentifyOrganizationalCulturalSupport: (state, data) => {
      state.report.identifyOrganizationalCulturalSupport = data.payload;
    },
    setIdentifyOrganizationalCulturalBarrier: (state, data) => {
      state.report.identifyOrganizationalCulturalBarrier = data.payload;
    },
    setPlanYourAction: (state, data) => {
      state.report.planYourAction = data.payload;
    },
    setEntireReport: (state, data) => {
      if (!data.payload) {
        state.report = initialState.report;
      } else {
        state.report = data.payload;
      }
      state.lockNavigation = false;
    },
    cleanReportJSON: (state) => {
      state = initialState;
    },
    setViewMode: (state, data) => {
      state.viewMode = data.payload;
    },
    setLastSection: (state, data) => {
      state.lastSection = data.payload;
    }
  }
});

export const {
  setSaveMode,
  setLockNavigation,
  setAssessTension,
  setEntireReport,
  setIdentifyIssue,
  setIdentifyOrganizationalCulturalBarrier,
  setIdentifyOrganizationalCulturalSupport,
  setIdentifyRequirements,
  setPlanYourAction,
  setProposeAction,
  setRecognizeTheMixture,
  cleanReportJSON,
  setViewMode,
  setLastSection
} = reportSlice.actions;

export default reportSlice.reducer;
