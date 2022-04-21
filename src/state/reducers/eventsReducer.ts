
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
    
    case '[events] - Activate event':
      return {
        ...state,
        activeEvent: { ...action.payload }
      }
    
    case '[events] - Clean active event':
      return {
        ...state,
        activeEvent: null,
      }

    case '[events] - Add new event':
      return {
        ...state,
        events: [ ...state.events, {...action.payload}]
      }

    case '[events] - Update event':
      return {
        ...state,
        events: state.events.map( event => (
          event._id === action.payload._id ? action.payload : event
        ))
      }

    case '[events] - Delete event':
      return {
        ...state,
        events: state.events.filter( event => event._id !== action.payload.id ),
      }

    case '[events] - Load events':
      return {
        ...state,
        events: [ ...action.payload ]
      }

  
    default:
      return state;
  }
  
}