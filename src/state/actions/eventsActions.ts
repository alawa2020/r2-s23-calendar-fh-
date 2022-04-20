import { Event } from "../../interfaces";

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

export const doAddNewEvent = ( event: Event ): EventsActionType => ({
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