import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { eventsReducer } from './eventsReducer';
import { uiReducer } from './uiReducer';


export const rootReducer = combineReducers({
  ui: uiReducer,
  events: eventsReducer,
  auth: authReducer,
});

export type State = ReturnType<typeof rootReducer>