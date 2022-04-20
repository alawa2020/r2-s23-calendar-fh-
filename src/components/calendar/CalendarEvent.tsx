import React, { FC } from 'react'
import { Event } from '../../interfaces'


interface Props {
  event: Event;
}


export const CalendarEvent: FC<Props> = ({ event }) => {

  const { title, user:{name} } = event;
  return (
    <div>
      <strong>{ title }</strong>
      <span> - { name } </span>
    </div>
  )
}
