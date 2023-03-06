import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
const {format} = require('date-fns')



function HallListTest() {
  const [hallData, setHallData] = useState([]);
  const [bookingData, setBookingData] = useState([])
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
        setBookingData(data);
        
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  function addBookings(hallList) {
    console.log("add bookings entered")
    const bookings = {};
    const today = new Date();
    for (let i = 0; i <= 10; i++) {
      const date = new Date(today.getTime() + i * 24 * 3600 * 1000);
      bookings[date.toISOString().slice(0, 10)] = {};
    }
    for (const hall of hallList) {
    console.log(hall)
      hall.bookings = bookings;
    }
    return hallList
  }

  function findInterval(startTime,endTime){
    const startHour = format(new Date(`2000-01-01T${startTime}`),'HH:mm')
    const endHour = format(new Date(`2000-01-01T${endTime}`),'HH:mm')

    const interval = `${startHour}-${endHour}`
    return interval

  }

  function findBookings(hallList,bookingList){
    hallList.forEach(item => {
        let filteredbookingList = bookingList.filter(booking=>booking.bookedHall===item.id)
        console.log(filteredbookingList)
        filteredbookingList.forEach(booking => {
            let {startTime,endTime,verified,event} = booking
            console.log("🚀 ~ file: HallListTest.js:51 ~ findBookings ~ startTime,endTime,verified,event:", startTime,endTime,verified,event)
            //form a object of event and verified
            let bookingDetail = {eventID:event,isVerified:verified}
            console.log("bookingDetail",bookingDetail)
            //convert the startTime and endTime into intervals of format '12:00-13:00'
            let intervalString = findInterval(startTime,endTime)
            console.log(intervalString)
            let bookingObject = {
                [intervalString]:bookingDetail
            }
            console.log(bookingObject)
            //find the date of the booking
                //dont have the date available at this moment
            
                
            //in the newhalldata, in bookings, match the found date,insert another object
            //with key as the interval formed above and value as object having verified and eventId
            //maybe also user_id

        })
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
        let newHallData = addBookings(data)
        setHallData(newHallData);
      })
      .catch((error) => {
        console.error("Error fetching data:,", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
      getBookingList()
      
      
      
  }, []);

  
  console.log("hallData",hallData);
  console.log("bookingData",bookingData)
  findBookings(hallData,bookingData)
  

  return (<div>HallListTest</div>);
}

export default HallListTest;
