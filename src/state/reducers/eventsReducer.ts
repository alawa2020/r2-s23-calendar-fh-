import moment from 'moment';
import { Event } from '../../interfaces';
import { EventsActionType } from '../actions';


interface EventsState {
  events: Event[];
  activeEvent: Event | null;
}

const initialState: EventsState = {
  events: [
    {
      title: 'Yo puedo!',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      _id: Date.now().toString(),
      notes: 'no me rendire! por mis amigos!',
      user: {
        uid: (Date.now()+1).toString(),
        name: 'Fernando',
      }
    }
  ],
  activeEvent: null,
}


export const eventsReducer = ( state: EventsState = initialState, action: EventsActionType): EventsState => {
  switch ( action.type ) {

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
  
    default:
      return state;
  }
  
}