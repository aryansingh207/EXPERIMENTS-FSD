import React, { useEffect } from 'react'
import { TAGS } from '../data/events'

function EventCardBase({ event, onDragStart, onEdit, logRender }) {
  useEffect(() => {
    logRender(event.id)
  })

  return (
    <div
      className="event-card"
      style={{
        borderLeftColor: TAGS[event.tag] || '#7C9CFF'
      }}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      onClick={() => onEdit(event.id)}
      title="Drag me to another day, or click to edit"
    >
      <div className="event-time">
        {event.time}
      </div>

      <div className="event-title">
        {event.title}
      </div>
    </div>
  )
}

export const EventCard = EventCardBase
export const MemoEventCard = React.memo(EventCardBase)