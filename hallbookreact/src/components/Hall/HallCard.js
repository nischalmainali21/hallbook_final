import CButton from "../CButton";
import VisualBar from "./VisualBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DateFilter from "../Time/DateFilter";
const { parse, compareAsc, format } = require("date-fns");

//returns the booked intervals and its details
function getBookedIntervals(booking) {
  // console.log("🚀 ~ file: HallCard.js:10 ~ getBookedIntervals ~ booking:", booking)

  const bookedIntervals = [];
  for (const interval in booking) {
    if (booking[interval]) {
      const { userID, eventID, isVerified } = booking[interval];
      bookedIntervals.push({ interval, userID, eventID, isVerified });
    }
  }
  return bookedIntervals;
}

function getBookedIntervalsOnly(booking) {
  const bookedIntervals = [];
  for (const interval in booking) {
    if (booking[interval]) {
      bookedIntervals.push(interval);
    }
  }
  return bookedIntervals;
}

function getUnbookedIntervals(bookedIntervals) {
  //the fixed time periods for which booking is allowed
  const startTime = parse("6:00", "H:mm", new Date());
  const endTime = parse("18:00", "H:mm", new Date());

  //parse the booked intervals into start and end time
  const bookedTimes = bookedIntervals.map((interval) => {
    const [start, end] = interval.split("-");
    return {
      start: parse(start, "H:mm", new Date()),
      end: parse(end, "H:mm", new Date()),
    };
  });

  //generate the unbooked intervals
  let unbookedIntervals = [];
  let previousEnd = startTime;

  bookedTimes.forEach(({ start, end }) => {
    //if there is a gap between previous end and current start time, designated as the unbooked interval
    if (start > previousEnd) {
      unbookedIntervals.push({
        start: previousEnd,
        end: start,
      });
    }

    // update the previous end time
    previousEnd = end;
  });

  //if there is a gap between last booked interval and end time,  add as unbooked interval
  if (previousEnd < endTime) {
    unbookedIntervals.push({
      start: previousEnd,
      end: endTime,
    });
  }

  //format the unbooked intervals as in 'H:mm - H:mm' format
  const unbookedStrings = unbookedIntervals.map(({ start, end }) => {
    return `${format(start, "H:mm")}-${format(end, "H:mm")}`;
  });

  return unbookedStrings;
}

// function sortIntervals(intervals) {
//   const intervalTimes = intervals.map((interval) => {
//     const [start, end] = interval.split("-");
//     return {
//       start: parse(start, "H:mm", new Date()),
//       end: parse(end, "H:mm", new Date()),
//     };
//   });

//   intervalTimes.sort((a, b) => compareAsc(a.start, b.start));

//   const intervalStrings = intervalTimes.map(({ start, end }) => {
//     return `${format(start, "H:mm")}-${format(end, "H:mm")}`;
//   });

//   return intervalStrings;
// }

//main starts here
//
//
//
function HallCard({ id, name, capacity, slides, bookings }) {
  const hall = { id, name, capacity, slides };

  const navigate = useNavigate();

  const navigateToHall = (hall) => {
    console.log("navigating to hall details");
    let path = `/halldetail/${hall.name}`;
    navigate(path, { state: { ...hall } });
  };

  const navigateToBookHall = (hall) => {
    console.log("navigating to book hall");
    let path = `/bookhall/${hall.name}`;
    navigate(path, { state: { ...hall } });
  };

  //for date filter component
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleDateChange(e, dateValid) {
    let date = e.target.value;
    if (dateValid) {
      setDate(date);
    }
  }

  //intervals,user,event
  let bookedIntervalsData = getBookedIntervals(bookings[date]);
  // console.log("🚀 ~ file: HallCard.js:128 ~ HallCard ~ bookedIntervalsData:", bookedIntervalsData)

  //interval
  let bookedIntervals = getBookedIntervalsOnly(bookings[date]);
  // console.log("🚀 ~ file: HallCard.js:134 ~ HallCard ~ bookedIntervals:", bookedIntervals)
  //unbooked interval
  let unbookedIntervals = getUnbookedIntervals(bookedIntervals);
  // console.log("🚀 ~ file: HallCard.js:137 ~ HallCard ~ unbookedIntervals:", unbookedIntervals)

  // console.log(Object.keys(bookings[date]))
  // for (const [key,value] of Object.entries(bookings[date])){
  //   console.log(key,value)
  // }
  return (
    <div className="rounded-lg shadow-lg">
      <div className="flex h-80 w-full flex-col gap-4 p-2">
        <div>
          <div className="flex items-center justify-between text-left">
            <div className="text-3xl font-bold">{name}</div>
            <div>
              <DateFilter
                id={id}
                name={name}
                date={date}
                handleChange={handleDateChange}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">Capacity: {capacity}</div>
        </div>
        {/* a div for the booked events and time intervals for those events needs to go here */}
        <div className=" text-cprimary-800">
          <p className="text-sm text-gray-500">Booked Time Periods:</p>
          <ul className="flex gap-4">
            {bookedIntervalsData.map((interval) => (
              <li key={interval.interval}>{interval.interval}</li> //change the key!!!
            ))}
          </ul>
        </div>

        <VisualBar
          bookedIntervals={bookedIntervals}
          unbookedIntervals={unbookedIntervals}
          bookedIntervalsData={bookedIntervalsData}
        />

        <div className="flex flex-col gap-6 md:flex-row">
          <CButton
            id="hall details"
            type="button"
            btnDesc="View Hall Details"
            onClick={() => navigateToHall(hall)}
          />

          <CButton
            id="Book Hall"
            type="button"
            btnDesc="Book Hall"
            onClick={() => navigateToBookHall(hall)}
          />
        </div>
      </div>
    </div>
  );
}

export default HallCard;
