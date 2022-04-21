import { Event } from '../interfaces'
import { EventoGetEvents } from '../interfaces/responses'

export const transformGetEventsOfDb = ( events: EventoGetEvents[]): Event[] => {
  const eventsOfFrontend: Event[] = events.map( event => ({
    title: event.title,
    notes: event.notes,
    start: new Date( event.start ),
    end: new Date( event.end ),
    _id: event.id,
    user: {
      uid: event.user._id,
      name: event.user.name,
    }
  }));

  return eventsOfFrontend;

}