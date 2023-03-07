import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState,useEffect } from "react";
import BookHall from "../Hall/BookHall";

function EditBooking() {
  const { state } = useLocation();
  const {
    id,
    eventManager,
    eventName,
    eventDate,
    startTime,
    endTime,
    bookedHall,
    organizingClub,
    EventDetailFile,
    EventDetailText,
    PhoneNumber,
  } = state;
  console.log(
    "🚀 ~ file: EditBooking.js:7 ~ EditBooking ~ id,eventManager,eventName,eventDate,startTime,endTime,bookedHall,organizingClub,EventDetailFile,EventDetailText,PhoneNubmer:",
    id,
    eventManager,
    eventName,
    eventDate,
    startTime,
    endTime,
    bookedHall,
    organizingClub,
    EventDetailFile,
    EventDetailText,
    PhoneNumber
  );
  const [bookedHallData, setBookedHallData] = useState("");


  let api = useFetch();

  useEffect(() => {
    let getHallData = async () => {
      try {
        let { response, data } = await api(`/api/hall/halls/${bookedHall}/`, {
          method: "GET",
        });
        if (response.ok) {
          setBookedHallData(data);
        }
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    
    getHallData();
  }, [bookedHall]);

  const formInputState = {
    id: id,
    eventManager: eventManager,
    eventName: eventName,
    eventDate: eventDate,
    eventStartTime: startTime,
    eventendTime: endTime,
    bookedHall: 1,
    orgClub: organizingClub,
    EventDetailFile: EventDetailFile,
    eventDesc: EventDetailText,
    pnumber: PhoneNumber,
    hallName:bookedHallData.hallName,
    capacity:bookedHallData.capacity,
  };
  console.log(formInputState)

  function handleSubmit(e){
    console.log("submit")
    e.preventDefault()
  }

  return(
    <>
    <div>
        <BookHall
        formInputState={formInputState}
        handleEditSubmit={handleSubmit}
        />
    </div>
    </>
  );
}

export default EditBooking;
