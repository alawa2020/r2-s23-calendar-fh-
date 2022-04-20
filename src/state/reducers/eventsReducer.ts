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
        uid: Date.now().toString(),
        name: 'Fernando',
      }
    }
  ],
  activeEvent: null,
}


export const eventsReducer = ( state: EventsState = initialState, action: EventsActionType): EventsState => {
  switch ( action.type ) {
  
    default:
      return state;
  }
  
}