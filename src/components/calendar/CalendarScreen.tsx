import React, { useState } from 'react'


import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui'
import { Event } from '../../interfaces';

import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events: Event[] = [
  {
    title: 'Yo puedo!',
    start: moment().toDate(),
    end: moment().add(1, 'hours').toDate(),
    _id: Date.now().toString(),
    description: 'no me rendire! por mis amigos!',
  }
]
export const CalendarScreen = () => {
  // hooks
  const [lastView, setLastView] = useState(localStorage.getItem('lastView-r2') || 'month');

  // functions
  const onView = ( e: string ) => {
    setLastView( e );
    localStorage.setItem('lastView-r2', e );
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
      />

    </div>
  )
}
