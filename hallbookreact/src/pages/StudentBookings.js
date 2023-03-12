import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";

import useAuth from "../hooks/useAuth";
import StudentBookingCard from "../components/Student/StudentBookingCard";

import { toast } from "react-toastify";

function StudentBookings() {
  let { user, authTokens } = useAuth();
  console.log(user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let api = useFetch();

  console.log(data);

  // let cancelEvent = async (id) => {
  //   try {
  //     let response = await fetch(
  //       `http://127.0.0.1:8000/api/hall/events/${id}/`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${authTokens.access}`,
  //         },
  //       }
  //     );
  //     let data;
  //     if(response.ok){
  //       toast.success("Cancelled Booking")
  //       console.log("successfully canceled")
        
  //       setTimeout(navigate(0),10000)
        
  //     }else{
  //       alert(response.statusText)
  //     }
  //     console.log(response,data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  let cancelEvent = async (id) => {
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/hall/bookings/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      let data;
      if(response.ok){
        toast.success("Cancelled Booking")
        console.log("successfully canceled")
        
        setTimeout(navigate(0),10000)
        
      }else{
        alert(response.statusText)
      }
      console.log(response,data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let getBookingList = async () => {
      try {
        let { response, data } = await api("/api/hall/bookings/", {
          method: "GET",
        });
        //   console.log(response, data);
        if (response.ok) {
          let filterData = data.filter((item) => item.booker === user.user_id);
          console.log("filterData", filterData);
          setData(filterData);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getBookingList();
  }, []);

  function handleEditClick(id, eventID) {
    console.log("edit", id);
    let getEventData = async (eventID) => {
      try {
        let { response, data } = await api(`/api/hall/events/${eventID}/`, {
          method: "GET",
        });
        if (response.ok) {
          console.log(data);
          navigate("/studentbookings/editbooking", { state: { ...data } });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEventData(eventID);
  }
  function handleCancelClick(id, eventID, isVerified) {
    console.log("cancel", id);
    console.log("eventid", eventID);
    console.log("isverified", isVerified);
    // if (!isVerified) {
    //   cancelEvent(eventID)
    // }
    // cancelEvent(eventID)
    cancelEvent(id)
  }

  let pendingData = data.filter((item) => !item.verified&&!item.rejected);
  let verifiedData = data.filter((item) => item.verified);
  let rejectedData = data.filter(item => item.rejected)
  console.log("pending", pendingData);
  console.log("verified", verifiedData);

  if (loading) return "Loading";
  if (error) return "error";

  return (
    <>
      <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 rounded-lg p-2 shadow-lg md:w-2/3 md:gap-8">
        <div className="text-center text-3xl font-bold">Pending Bookings</div>
        {pendingData.length ? (
          pendingData.map((item) => (
            <StudentBookingCard
              key={item.id}
              id={item.id}
              eventID={item.event}
              bookedHallID={item.bookedHall}
              startTime={item.startTime}
              endTime={item.endTime}
              eventDate={item.eventDate}
              verified={item.verified}
              handleCancelClick={handleCancelClick}
              handleEditClick={handleEditClick}
            />
          ))
        ) : (
          <div className="text-center font-bold text-cprimary-600">
            No Pending Bookings
          </div>
        )}
        <hr className="my-8 h-px  border-0 dark:bg-gray-100"></hr>
        <div className="text-center text-3xl font-bold">Verified Bookings</div>
        {verifiedData.length ? (
          verifiedData.map((item) => (
            <StudentBookingCard
              key={item.id}
              id={item.id}
              eventID={item.event}
              bookedHallID={item.bookedHall}
              startTime={item.startTime}
              endTime={item.endTime}
              eventDate={item.eventDate}
              verified={item.verified}
              handleCancelClick={handleCancelClick}
            />
          ))
        ) : (
          <div className="text-center font-bold text-cprimary-600">
            No Past Bookings
          </div>
        )}
        <hr className="my-8 h-px  border-0 dark:bg-gray-100"></hr>
        <div className="text-center text-3xl font-bold">Rejected Bookings</div>
          {rejectedData.length?(
            rejectedData.map(item=>(
              <StudentBookingCard
              key={item.id}
              id={item.id}
              eventID={item.event}
              bookedHallID={item.bookedHall}
              startTime={item.startTime}
              endTime={item.endTime}
              eventDate={item.eventDate}
              rejected={item.rejected}
              
            />
            ))
          ):
          (
            <div className="text-center font-bold text-cprimary-600">
            No Rejected Bookings
          </div>
          )}
      </div>
    </>
  );
}

export default StudentBookings;
