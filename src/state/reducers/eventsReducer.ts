import { Event } from '../../interfaces';
import { EventsActionType } from '../actions';


interface EventsState {
  events: Event[];
  activeEvent: Event | null;
}

const initialState: EventsState = {
  events: [],
  activeEvent: null,
}


export const eventsReducer = ( state: EventsState = initialState, action: EventsActionType): EventsState => {
  switch ( action.type ) {
  
    default:
      return state;
  }
  
}