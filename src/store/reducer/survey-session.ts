import { createSlice } from '@reduxjs/toolkit';

interface ISurveySession {
  surveyType?: 'MDM' | 'PDP' | 'PDMI';
  surveySessionName: string;
  isSaving: boolean;
  isSurveyOpen?: boolean;
  viewMode?: boolean;
}

const initialState: ISurveySession = {
  surveyType: undefined,
  surveySessionName: '',
  isSaving: false,
  isSurveyOpen: false,
  viewMode: false
};

export const surveySessionSlice = createSlice({
  name: 'surveySession',
  initialState,
  reducers: {
    setSurveySessionType: (
      data,
      { payload }: { payload: { surveyType: ISurveySession['surveyType'] } }
    ) => {
      data.surveyType = payload.surveyType;
    },
    setSurveySessionName: (
      data,
      {
        payload
      }: { payload: { surveySessionName: ISurveySession['surveySessionName'] } }
    ) => {
      data.surveySessionName = payload.surveySessionName;
    },
    setIsSaving: (
      data,
      { payload }: { payload: { isSaving: ISurveySession['isSaving'] } }
    ) => {
      data.isSaving = payload.isSaving;
    },
    setIsSurveyOpen: (
      data,
      { payload }: { payload: { isSurveyOpen: ISurveySession['isSurveyOpen'] } }
    ) => {
      data.isSurveyOpen = payload.isSurveyOpen;
    },
    setViewMode: (
      data,
      { payload }: { payload: { viewMode: ISurveySession['viewMode'] } }
    ) => {
      data.viewMode = payload.viewMode;
    }
  }
});

export const {
  setSurveySessionType,
  setSurveySessionName,
  setIsSaving: setIsSurveySessionSaving,
  setIsSurveyOpen,
  setViewMode
} = surveySessionSlice.actions;
export default surveySessionSlice.reducer;
