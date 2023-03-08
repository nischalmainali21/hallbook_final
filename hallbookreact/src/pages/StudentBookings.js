import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";

import useAuth from "../hooks/useAuth";
import StudentBookingCard from "../components/Student/StudentBookingCard";

function StudentBookings() {
  let { user } = useAuth();
  console.log(user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let api = useFetch();
  
  console.log(data);

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

  function handleEditClick(id,eventID) {
    console.log("edit", id);
    let getEventData = async (eventID) => {
      try {
        let {response,data} = await api(`/api/hall/events/${eventID}/`,{
          method:"GET",
        })
        if(response.ok){
          console.log(data)
          navigate('/studentbookings/editbooking',{state:{...data}})
        }
      }catch(error){
        console.error(error)
      }
    }
    getEventData(eventID)
  }
  function handleCancelClick(id) {
    console.log("cancel", id);
  }

  let pendingData = data.filter((item) => !item.verified);
  let verifiedData = data.filter((item) => item.verified);
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
      </div>
    </>
  );
}

export default StudentBookings;
