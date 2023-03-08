import React, { useEffect } from "react";
import CButton from "../CButton";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";


function FacultyBookingCard({
  id,
  eventID,
  bookedHallID,
  startTime,
  endTime,
  eventDate,
  verified,
  handleVerifyClick,
  handleRejectClick,
}) {
  const buttonfixedclass = `buttonfixedclass`;
  const [bookedHallName, setBookedHallName] = useState('')
  const [eventData, setEventData] = useState([])

  let api = useFetch();
  
  
  // let getEventData = async() => {
  //   try{
  //     let {response,data} = await api(`/api/hall/events/${eventID}/`,{
  //       method:"GET",
  //     })
  //     if(response.ok){
  //       setEventData(data)
  //     }
  //   }
  //   catch(error){
  //     console.error(error)
  //   }
  // }
  useEffect(()=>{
    let getHallData = async () => {
      try {
        let { response, data } = await api(`/api/hall/halls/${bookedHallID}/`, {
          method: "GET",
        });
        if (response.ok) {
          setBookedHallName(data.hallName)
        }
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    let getEventData = async() => {
      try{
        let {response,data} = await api(`/api/hall/events/${eventID}/`,{
          method:"GET",
        })
        if(response.ok){
          setEventData(data)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    getEventData()
    getHallData()
  },[bookedHallID,eventID])
  // getEventData()
  // console.log(bookedHallName)
  let borderclass = verified? "border-green-200":"border-yellow-200"

  return (
    <div>
      <div className={`flex flex-col justify-between rounded-lg p-2 shadow-lg md:flex-row md:items-center md:justify-between items-baseline border-y-2 `+borderclass}>
        <div className="flex h-36  flex-col gap-4 p-1 md:h-40">
          <div className="text-align flex flex-col gap-1">
            <div className="text-md">Event Name: <span className="font-bold">{eventData.eventName}</span></div>
            <div className="text-md">BookedHall: <span className="font-bold">{bookedHallName}</span></div>
            <div className="text-md">Event Date: <span className="font-bold">{eventDate}</span></div>
            <div className="text-md">
              EventTime: <span className="font-bold">{`${startTime}-${endTime}`}</span>
            </div>
            <div className="text-md">Booker Email: <span className="font-bold">{eventData.email}</span></div>

          </div>
        </div>
        <div>
          <div className="text-md">Status</div>
          <div className="text-md font-bold">
            {verified ? "Verified" : "Unverified"}
          </div>
        </div>
        {verified ? (
          ""
        ) : (
          <div className="flex md:gap-6 ">
            <CButton
              id={`verifyBooking${id}`}
              type="button"
              btnDesc="Verify"
              onClick={() => handleVerifyClick(id,bookedHallID,eventID,startTime,endTime,eventDate)}
            />
            <button
              id={`rejectBooking${id}`}
              type="button"
              onClick={() => handleRejectClick(id)}
              className={
                buttonfixedclass +
                ` bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`
              }
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyBookingCard;
