import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import FacultyBookingCard from "../components/Facutly/FacultyBookingCard";
import { useNavigate } from "react-router";

export default function About() {
  let { authTokens } = useAuth();
  console.log(authTokens.access);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let api = useFetch();
  let getBookingList = async () => {
    try {
      let { response, data } = await api("/api/hall/bookings/", {
        method: "GET",
      });
      //   console.log(response, data);
      if (response.ok) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  // let verifyBooking = async (id,payload) => {
  //   try {
  //     let { response, data } = await api(`/api/hall/bookings/${id}`, {
  //       method: "PUT",
  //       body:payload
  //     });
  //     console.log(response, data);

  //   } catch (error) {
  //     console.error(error);
  //
  //   }
  // }

  let verifyBooking = async (id, payload) => {
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/hall/bookings/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: payload,
        }
      );
      let data = response.json();
      if (response.ok) {
        console.log("successfully verified");
        navigate(0);
      } else {
        alert(response);
      }
      console.log(response, data);
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     let getBookingList = async () => {
  //         try {
  //             console.log("reqeust to get bookings")
  //             const response = await fetch("http://127.0.0.1:8000/api/hall/bookings/",{

  //             })
  //             if(response.ok){
  //                 const data = await response.json()
  //                 setData(data)
  //                 setLoading(false)
  //             }
  //         } catch (error) {
  //             console.error(error)
  //             setError(error)
  //         }
  //     }
  //     getBookingList()
  //   }, [])

  useEffect(() => {
    getBookingList();
  }, []);

  const handleVerifyClick = (
    id,
    bookedHallID,
    eventID,
    startTime,
    endTime,
    eventDate
  ) => {
    console.log("verify", id, bookedHallID, eventID, startTime, endTime);
    const payload = new FormData();
    payload.append("bookedHall", bookedHallID);
    payload.append("verified", true);
    payload.append("event", eventID);
    payload.append("startTime", startTime);
    payload.append("endTime", endTime);
    payload.append("eventDate", eventDate);

    for (const [key, value] of payload) {
      console.log(key, value);
    }
    verifyBooking(id, payload);
  };

  const handleRejectClick = (id) => {
    console.log("Reject", id);
  };
  console.log(data);
  let pendingData = data.filter((item) => !item.verified);
  let verifiedData = data.filter((item) => item.verified);
  if (loading) return "Loading";
  if (error) return "error";

  return (
    <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 rounded-lg p-2 shadow-lg md:w-2/3 md:gap-8">
      {/* need to sort data according to time */}
      {/* filter data according to verified and unverified */}
      <div className="text-center text-3xl font-bold">Pending Bookings</div>
      {!pendingData.length ? (
        <div className="text-center font-bold text-cprimary-600">
          No pending Bookings
        </div>
      ) : null}
      {data
        .filter((item) => !item.verified)
        .map((item) => (
          <FacultyBookingCard
            key={item.id}
            id={item.id}
            eventID={item.event}
            bookedHallID={item.bookedHall}
            startTime={item.startTime}
            endTime={item.endTime}
            verified={item.verified}
            eventDate={item.eventDate}
            handleVerifyClick={handleVerifyClick}
            handleRejectClick={handleRejectClick}
          />
        ))}
      <hr className="my-8 h-px  border-0 dark:bg-gray-100"></hr>
      <div className="text-center text-3xl font-bold">Verified Bookings</div>
      {!verifiedData ? (
        <div className="text-center font-bold text-cprimary-600">
          No verified Bookings
        </div>
      ) : null}
      {data
        .filter((item) => item.verified)
        .map((item) => (
          <FacultyBookingCard
            key={item.id}
            id={item.id}
            eventID={item.event}
            bookedHallID={item.bookedHall}
            startTime={item.startTime}
            endTime={item.endTime}
            verified={item.verified}
            eventDate={item.eventDate}
          />
        ))}
    </div>
  );
}
