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
    startTime: startTime,
    endTime: endTime,
    bookedHall: 1,
    organizingClub: organizingClub,
    EventDetailFile: EventDetailFile,
    EventDetailText: EventDetailText,
    PhoneNumber: PhoneNumber,
    hallName:bookedHallData.hallName,
    capacity:bookedHallData.capacity,
  };
  console.log(formInputState)

  return(
    <>
    <div>
        <BookHall/>
    </div>
    </>
  );
}

export default EditBooking;
