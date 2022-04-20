import { Event } from "../../interfaces";

// types
export type EventsActionType =
  |{ type: '[events] - Add new event'; payload: Event }


// synchronous actions
export const doAddNewEvent = ( event: Event ): EventsActionType => ({
  type: '[events] - Add new event',
  payload: event,
})


// asynchronous actions