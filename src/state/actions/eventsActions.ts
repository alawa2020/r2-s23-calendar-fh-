import { Event } from "../../interfaces";

// types
export type EventsActionType =
  |{ type: '[events] - Add new event'; payload: Event }
  |{ type: '[events] - Activate event'; payload: Event }
  |{ type: '[events] - Clean active event'; }


// synchronous actions
export const doAddNewEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Add new event',
  payload: event,
});

export const doActivateEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Activate event',
  payload: event,
});

export const doCleanActiveEvent = (): EventsActionType => ({
  type: '[events] - Clean active event',
})


// asynchronous actions