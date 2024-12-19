import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducer/auth';
import surveySessionReducer from './reducer/survey-session';
import React from 'react';
import {
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook
} from 'react-redux';

const reducers = combineReducers({
  auth: authReducer,
  surveySession: surveySessionReducer
});

export const store = configureStore({
  reducer: reducers
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const rootStoreContext = React.createContext<
  ReactReduxContextValue<any, AnyAction>
>({
  store: store,
  storeState: store.getState()
});

export const rootStoreDispatch = createDispatchHook(rootStoreContext);
export const rootStoreSelector = createSelectorHook(rootStoreContext);
