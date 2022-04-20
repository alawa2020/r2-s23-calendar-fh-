import { combineReducers } from 'redux';
import { eventsReducer } from './eventsReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  events: eventsReducer,
});

export type State = ReturnType<typeof rootReducer>