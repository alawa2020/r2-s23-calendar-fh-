import { Dispatch } from "redux";
import { Event } from "../../interfaces";
import { CreateEventResponse } from "../../interfaces/responses";
import { fetchWithToken } from '../../utils/fetch';
import { State } from "../reducers";

// types
export type EventsActionType =
  |{ type: '[events] - Activate event'; payload: Event }
  |{ type: '[events] - Clean active event'; }
  |{ type: '[events] - Add new event'; payload: Event }
  |{ type: '[events] - Update event'; payload: Event }
  |{ type: '[events] - Delete event'; payload: { id: string } }


// synchronous actions
export const doActivateEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Activate event',
  payload: event,
});

export const doCleanActiveEvent = (): EventsActionType => ({
  type: '[events] - Clean active event',
});

const doAddNewEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Add new event',
  payload: event,
});

export const doUpdateEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Update event',
  payload: event,
});

export const doDeleteEvent = ( id: string ): EventsActionType => ({
  type: '[events] - Delete event',
  payload: {
    id,
  }
});



// asynchronous actions
export const startAddEvent = ( event: Event ) => {
  return async( dispatch: Dispatch, getState: () => State ) => {

    const { user: userAuth } = getState().auth;
    const { _id, user, ...eventToUpload } = { ...event };

    try {

      const resp = await fetchWithToken('/events', eventToUpload, 'POST' );
      const body: CreateEventResponse = await resp.json();

      if( body.ok ) {
        dispatch( doAddNewEvent({ 
          ...eventToUpload, 
          _id: body.evento.id,
          user: {
            uid: body.evento.user,
            name: userAuth?.name!,
          }
        }));
      } else {
        alert('no se pudo agregar!');
      }

    } catch (err) {
      console.log(err);
      alert('somethin went wrong!');
    }
  }
}