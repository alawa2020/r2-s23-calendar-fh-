import React, { useState } from 'react'


import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'

import { AddNewFab, Navbar } from '../ui'
import { Event } from '../../interfaces';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { messages } from '../../utils';
import { ModalCalendar } from './';
import { useDispatch } from 'react-redux';
import { doOpenModal } from '../../state/actions';

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events: Event[] = [
  {
    title: 'Yo puedo!',
    start: moment().toDate(),
    end: moment().add(1, 'hours').toDate(),
    _id: Date.now().toString(),
    notes: 'no me rendire! por mis amigos!',
  }
]
export const CalendarScreen = () => {
  // hooks
  const [lastView, setLastView] = useState(localStorage.getItem('lastView-r2') || 'month');

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
      />

      <AddNewFab />

      <ModalCalendar />

    </div>
  )
}
