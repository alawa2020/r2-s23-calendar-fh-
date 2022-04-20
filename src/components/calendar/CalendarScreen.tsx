import React, { useState } from 'react'

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'

import { AddNewFab, Navbar } from '../ui'
import { Event } from '../../interfaces';
import { messages } from '../../utils';
import { ModalCalendar, CalendarEvent } from './';
import { useDispatch, useSelector } from 'react-redux';
import { doOpenModal } from '../../state/actions';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { State } from '../../state/reducers';


const localizer = momentLocalizer(moment); // or globalizeLocalizer



export const CalendarScreen = () => {
  // hooks
  const [lastView, setLastView] = useState(localStorage.getItem('lastView-r2') || 'month');

  const { events } = useSelector( (state: State) => state.events );
  const dispatch = useDispatch();

  // functions
  const onView = ( e: string ) => {
    setLastView( e );
    localStorage.setItem('lastView-r2', e );
  }

  const eventPropGetter = ( event: Event, start: Date, end: Date, isSelected: boolean ) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
    return { style }
  }

  const onSelectEvent = ( event: Event ) => {
    console.log('select', event.title);
  }

  const onDoubleClickEvent = ( event: Event ) => {
    console.log('doubleClick', event.title);
    dispatch( doOpenModal() );
  }


  return (
    <div className="calendar-screen">
      <Navbar />
      
      <Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        view={ lastView as View }
        onView={ onView }
        eventPropGetter={ eventPropGetter }
        onSelectEvent={ onSelectEvent }
        onDoubleClickEvent={ onDoubleClickEvent }
        messages={ messages }
        components={{
          event: CalendarEvent
        }
        }
      />

      <AddNewFab />

      <ModalCalendar />

    </div>
  )
}
