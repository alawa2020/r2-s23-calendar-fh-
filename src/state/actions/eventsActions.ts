import { Dispatch } from "redux";
import { Event } from "../../interfaces";
import { CreateEventResponse, DeleteEventResponse, GetEventsResponse, UpdateEventResponse } from "../../interfaces/responses";
import { fetchWithToken } from '../../utils/fetch';
import { State } from "../reducers";
import { transformGetEventsOfDb } from '../../utils/transform-get-events-of-db';

// types
export type EventsActionType =
  |{ type: '[events] - Activate event'; payload: Event }
  |{ type: '[events] - Clean active event'; }
  |{ type: '[events] - Add new event'; payload: Event }
  |{ type: '[events] - Update event'; payload: Event }
  |{ type: '[events] - Delete event'; payload: { id: string } }
  |{ type: '[events] - Load events'; payload: Event[] }
  |{ type: '[events] - Clean events state'; }


// synchronous actions

export const doCleanEventsState = (): EventsActionType => ({
  type: '[events] - Clean events state',
});

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

const doUpdateEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Update event',
  payload: event,
});

const doDeleteEvent = ( id: string ): EventsActionType => ({
  type: '[events] - Delete event',
  payload: {
    id,
  }
});

const doLoadEvents = ( events: Event[] ):EventsActionType => ({
  type: '[events] - Load events',
  payload: events,
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

export const startLoadEvents = () => {
  return async( dispatch: Dispatch ) => {
    try {

      const resp = await fetchWithToken( '/events' );
      const body: GetEventsResponse = await resp.json();

      if( body.ok ) {
        dispatch( doLoadEvents( transformGetEventsOfDb( body.eventos )) )
      } else {
        alert('no se pudo cargar los eventos')
      }
    } catch (err) {
      console.log(err);
      alert('something went wrong!');
    }
  }
}

export const startUpdateEvent = ( event: Event ) => {
  return async( dispatch: Dispatch ) => {
    const { _id, user, ...eventToUpdate} = { ...event };
    try {
      const resp = await fetchWithToken(`/events/${ event._id }`, eventToUpdate, 'PUT' );
      const body: UpdateEventResponse = await resp.json();

      if( body.ok ) {
        dispatch( doUpdateEvent( event ) );
      } else {
        alert( body.msg );
      }
    } catch (err) {
      console.log(err);
      alert('something went wrong!');
    }
  }
}

export const startDeleteEvent = ( eventId: string ) => {
  return async( dispatch: Dispatch ) => {
    try {
      const resp = await fetchWithToken(`/events/${ eventId }`, {}, 'DELETE' );
      const body: DeleteEventResponse = await resp.json();

      if( body.ok ) {
        dispatch( doDeleteEvent( eventId ) );
        dispatch( doCleanActiveEvent() );
      } else {
        alert( body.msg );
      }
    } catch (err) {
      console.log(err);
      alert('something went wrong!');
    }
  }
}