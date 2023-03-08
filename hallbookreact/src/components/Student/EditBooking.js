import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState,useEffect } from "react";
import BookHall from "../Hall/BookHall";
import useAuth from "../../hooks/useAuth";


function EditBooking() {
  const { state } = useLocation();
  let { authTokens } = useAuth();

  const {
    id,
    eventManager,
    eventName,
    eventDate,
    startTime,
    endTime,
    email,
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

//   let submitData = async (payload) => {
//     try {
//       let { response, data } = await api(`/api/hall/events/${id}`, {
//         method: "PUT",
//         body: payload,
//       });
//       if(response.ok){
//         console.log(data)
//       }
//       else if (response.status === 400) {
//         alert(response); //use a notification component here
//       }
//       else{
//         alert(response.statusText)
//       }
//       // console.log(response, data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

let submitData = async(id,payload)=> {
    try{
        let response = await fetch(`http://127.0.0.1:8000/api/hall/events/${id}/`,{
            method:'PUT',
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
              },
            body:payload,
        })
        let data = response.json()
        if(response.ok){
            console.log("successfully edited")
            // navigate(0)
        }else{
            alert(response.statusText)
        }
        console.log(response,data)
    }catch(error){
        console.error(error)
    }
}

  const formInputState = {
    id: id,
    eventManager: eventManager,
    eventName: eventName,
    eventDate: eventDate,
    eventStartTime: startTime,
    eventendTime: endTime,
    bookedHall: 1,
    email:email,
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
    const file = e.target.eventDetails.files[0];

    const payload = new FormData();
    payload.append("bookedHall", bookedHall);
    payload.append("eventDate", e.target.eventDate.value);
    payload.append("startTime", e.target.eventStartTime.value);
    payload.append("endTime", e.target.eventendTime.value);
    payload.append("eventManager", e.target.eventManager.value);
    payload.append("organizingClub", e.target.orgClub.value);
    payload.append("eventName", e.target.eventName.value);
    payload.append("email", e.target.email.value);
    payload.append("PhoneNumber", e.target.pnumber.value);
    payload.append("EventDetailText", e.target.eventDesc.value);
    payload.append("EventDetailFile", file);

    for (const [key, value] of payload) {
      console.log(key, value);
    }

    submitData(id,payload);
    e.preventDefault();
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
