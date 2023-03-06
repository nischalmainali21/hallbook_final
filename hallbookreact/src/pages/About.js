import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import FacultyBookingCard from "../components/Facutly/FacultyBookingCard";
import { useNavigate } from "react-router";

export default function About() {
  let { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

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

  let verifyBooking = async (id,payload) => {
    try {
      let { response, data } = await api(`/api/hall/bookings/${id}`, {
        method: "PUT",
        body:payload
      });
      console.log(response, data);
      
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

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

  const handleVerifyClick = (id,bookedHallID,eventID,startTime,endTime) => {
    console.log("verify",id,bookedHallID,eventID,startTime,endTime)
    const payload = new FormData()
    payload.append("bookedHall",bookedHallID)
    payload.append("verified",true)
    payload.append("event",eventID)
    payload.append("startTime",startTime)
    payload.append("endTime",endTime)

    for (const [key, value] of payload) {
      console.log(key, value);
    }
    verifyBooking(id,payload)
    // navigate('/')
  }

  const handleRejectClick = (id) => {
    console.log("Reject",id)
  }
  console.log(data);
  if (loading) return "Loading";
  if (error) return "error";

  return (
    <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 rounded-lg p-2 shadow-lg md:w-2/3 md:gap-8">
      {/* need to sort data according to time */}
      {/* filter data according to verified and unverified */}
      <div className="text-3xl font-bold text-center">Pending Bookings</div>
      {data.filter(item=>!item.verified).map((item) => (
        <FacultyBookingCard
          key={item.id}
          id={item.id}
          eventID={item.event}
          bookedHallID={item.bookedHall}
          startTime={item.startTime}
          endTime={item.endTime}
          verified={item.verified}
          handleVerifyClick={handleVerifyClick}
          handleRejectClick={handleRejectClick}
        />
      ))}
      <div className="text-3xl font-bold text-center">Verified Bookings</div>
      {data.filter(item=>item.verified).map((item) => (
        <FacultyBookingCard
          key={item.id}
          id={item.id}
          eventID={item.event}
          bookedHallID={item.bookedHall}
          startTime={item.startTime}
          endTime={item.endTime}
          verified={item.verified}
        />
      ))}
    </div>
  );
}
