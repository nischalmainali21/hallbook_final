import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import HallCard from "../components/Hall/HallCard";
// import hallListOrg from "../components/Hall/HallList";
// import HallListTest from "../components/Hall/HallListTest";
import useAuth from "../hooks/useAuth";
// import fetchInstance from "../utils/fetchInstance"
import useFetch from "../hooks/useFetch";
const { format } = require("date-fns");

//somehow works
// hallListOrg[0].bookings = {
//   ...hallListOrg[0].bookings,
//   "2023-02-26": {
//     "12:30-13:00": { user: "Jffohn", event: "oriehntation" },
//     "14:00-15:30": { user: "John", event: "orientation" },
//   },
//   // "2023-02-26": { "14:00-15:30": { user: "John", event: "orientation" } },
// };
// // hallListOrg[0].bookings = {
// //   ...hallListOrg[0].bookings,
// //   "2023-02-26": { "14:00-15:30": { user: "John", event: "orientation" } },
// // };
// hallListOrg[0].bookings = {
//   ...hallListOrg[0].bookings,
//   "2023-02-28": { "10:30-11:00": { user: "John", event: "orientation" } },
// };
// hallListOrg[1].bookings = {
//   ...hallListOrg[0].bookings,
//   "2023-02-26": { "10:30-12:00": { user: "John", event: "orientation" } },
// };

//when the user supposedly submits the book hall request and the request is still pending
//testing purpose
//this way of changing value does not work
//this changes the value of all the halls event if only index 0 is referenced
// hallList[0].bookings['2023-02-24']['10:30-12:00']= {user:'John',event:"orientation"}
// hallList[0].bookings['2023-02-24']['14:00-15:30']= {user:'Mike',event:"initiation"}
// hallList[0].bookings['2023-02-25']['14:00-15:30']= {user:'Mike',event:"initiation"}

export default function Home() {
  const [data, setData] = useState(null);
  const [hallData, setHallData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens } = useAuth();

  let api = useFetch();
  let getBookingList = async () => {
    try {
      let { response, data } = await api("/api/hall/bookings/", {
        method: "GET",
      });
      //   console.log(response, data);
      if (response.ok) {
        setBookingData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //function to add bookings for the incoming hallData
  function addBookings(hallList) {
    console.log("add bookings entered");
    const bookings = {};
    const today = new Date();
    for (let i = 0; i <= 10; i++) {
      const date = new Date(today.getTime() + i * 24 * 3600 * 1000);
      bookings[date.toISOString().slice(0, 10)] = {};
    }
    for (const hall of hallList) {
      // console.log(hall);
      hall.bookings = bookings;
    }
    return hallList;
  }

  function findInterval(startTime, endTime) {
    const startHour = format(new Date(`2000-01-01T${startTime}`), "HH:mm");
    const endHour = format(new Date(`2000-01-01T${endTime}`), "HH:mm");

    const interval = `${startHour}-${endHour}`;
    return interval;
  }

  function findBookings(hallList, bookingList) {
    hallList.forEach((item) => {
      let filteredbookingList = bookingList.filter(
        (booking) => booking.bookedHall === item.id
      );
      // console.log("filteredbookingList", filteredbookingList);
      filteredbookingList.forEach((booking) => {
        let {
          startTime,
          endTime,
          verified,
          event,
          eventDate,
          booker,
          bookedHall,
        } = booking;
        // console.log(
        //   "🚀 ~ file: HallListTest.js:51 ~ findBookings ~ startTime,endTime,verified,event:",
        //   startTime,
        //   endTime,
        //   verified,
        //   event
        // );
        //form a object of event and verified
        let bookingDetail = {
          userID: booker,
          eventID: event,
          isVerified: verified,
        };
        // console.log("bookingDetail", bookingDetail);
        //convert the startTime and endTime into intervals of format '12:00-13:00'
        let intervalString = findInterval(startTime, endTime);
        // console.log(intervalString);
        let bookingObject = {
          [intervalString]: bookingDetail,
        };
        // console.log(bookingObject);
        //find the date of the booking
        // console.log("evetndate", eventDate);

        const index = hallData.findIndex((hall) => hall.id === bookedHall);
        //  console.log(
        //   "🚀 ~ file: HallListTest.js:114 ~ filteredbookingList.forEach ~ index:",
        //   index
        // );
        if (index !== -1) {
          const existingBookings = hallData[index].bookings[eventDate] || {};
          const newBookings = {
            ...existingBookings,
            [intervalString]: bookingDetail,
          };
          console.log(newBookings);
          hallData[index].bookings = {
            ...hallData[index].bookings,
            [eventDate]: newBookings,
          };
        }

        // let tempeventDateobj = hallData[index].bookings[eventDate]
        // console.log("🚀 ~ file: Home.js:135 ~ filteredbookingList.forEach ~ tempeventDateobj:", tempeventDateobj)

        // hallData[index].bookings = {
        //   ...hallData[index].bookings,
        //   // [eventDate]: {bookingObject},
        //   [eventDate] :{bookingObject,...hallData[index].bookings[eventDate]}
        // };

        console.log(hallData);
      });
    });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hall/halls/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        let newHallData = addBookings(data);
        setHallData(newHallData);
      })
      .catch((error) => {
        console.error("Error fetching data:,", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    getBookingList();
  }, []);

  // console.log("hallData", hallData);
  // console.log("bookingData", bookingData);
  findBookings(hallData, bookingData);

  // let api = useFetch()
  // let getHallList = async() => {
  //   let {response,data} = await api('/api/hall/halls/')
  //   console.log(response,data)
  // }

  // getHallList()

  if (loading) return "loading..."; //maybe a spinner component
  if (error) return "error...";

  // console.log(data);

  //dumb way to do things
  //home is accessible by any logged in user
  //at home it will redirect on the basis on type of user logging in
  //only if the user is student the home will render its actual components

  let userType = authTokens.user_type;
  console.log(hallData)
  if (userType === "admin") {
    return <Navigate to="/adminpage" />;
  } else if (userType === "faculty") {
    return <Navigate to="/facultypage" />;
  } else {
    return (
      <>
        {/* <HallListTest/> */}
        <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 p-2 md:w-2/3 md:gap-8">
          {hallData.map((hall) => (
            <HallCard
              key={hall.id}
              id={hall.id}
              name={hall.hallName}
              capacity={hall.capacity}
              url={hall.image}
              bookings={hall.bookings}
              location={hall.location}
            />
          ))}
        </div>
      </>
    );
  }
}
