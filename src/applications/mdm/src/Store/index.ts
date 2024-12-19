import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import reportReducer from './reducers/report';
import {
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook
} from 'react-redux';
import React from 'react';

const reducers = combineReducers({
  report: reportReducer
});

export const mdmStore = configureStore({
  reducer: reducers
});

export type MDMRootState = ReturnType<typeof mdmStore.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mdmStore.dispatch;

export const mdmStoreContext = React.createContext<
  ReactReduxContextValue<any, AnyAction>
>({
  store: mdmStore,
  storeState: mdmStore.getState()
});

export const mdmStoreDispatch = createDispatchHook(mdmStoreContext);
export const mdmStoreSelector = createSelectorHook(mdmStoreContext);
