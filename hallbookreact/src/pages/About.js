import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import FacultyBookingCard from "../components/Facutly/FacultyBookingCard";

export default function About() {
  let { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  console.log(data);
  if (loading) return "Loading";
  if (error) return "error";

  return (
    <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 rounded-lg p-2 shadow-lg md:w-2/3 md:gap-8">
      About goes here
      {user && <p>Hello {user.user_id}</p>}
      {data.map((item) => (
        <FacultyBookingCard
          key={item.id}
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
