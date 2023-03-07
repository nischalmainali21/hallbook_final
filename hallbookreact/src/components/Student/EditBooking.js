import React from 'react'
import { useLocation } from 'react-router-dom'

function EditBooking() {
    const {state} = useLocation();
    const {id,eventManager,eventName,eventDate,startTime,endTime,bookedHall,organizingClub,EventDetailFile,EventDetailText,PhoneNumber} = state;
    console.log("🚀 ~ file: EditBooking.js:7 ~ EditBooking ~ id,eventManager,eventName,eventDate,startTime,endTime,bookedHall,organizingClub,EventDetailFile,EventDetailText,PhoneNubmer:", id,eventManager,eventName,eventDate,startTime,endTime,bookedHall,organizingClub,EventDetailFile,EventDetailText,PhoneNumber)
    
  return (
    <div>EditBooking</div>
  )
}

export default EditBooking