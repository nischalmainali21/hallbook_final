import React, { useState } from "react";
import ValidIcon from "../Icons/ValidIcon";
import InvalidIcon from "../Icons/InvalidIcon";

// const HallInpputClass = `w-full max-w-sm appearance-none
//                 rounded-md border border-cprimary-500 px-4 py-3
//                 text-cprimary-800 placeholder-gray-500
//                 shadow-sm focus:z-10 focus:border-blue-500 focus:shadow-lg
//                 focus:outline-none focus:ring-purple-500 sm:text-base
//                 `;

const HallInpputClass = `hallinputclass `;

function maxDate() {
  const today = new Date();
  const res = new Date(today.getTime() + 10 * 24 * 3600 * 1000);

  // console.log(res)
  // console.log(res.toISOString().slice(0,10))

  // let day = String(today.getDate() + 10); //selectable upto 10 days
  // let month = String(today.getMonth() + 1);
  // let year = String(today.getFullYear());

  // if (parseInt(month, 10) < 10) {
  //   month = "0" + month.toString();
  // }
  // if (parseInt(day, 10) < 10) {
  //   day = "0" + day.toString();
  // }
  // //   console.log(`${year}-${month}-${day}`);
  // return `${year}-${month}-${day}`;

  return res.toISOString().slice(0, 10);
}

function minDate() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const isBefore6pm = hours < 18 || (hours === 18 && minutes < 0);
  console.log("isBefore6pm", isBefore6pm);
  //if today 6 pm has already passed retrun tomorrows date
  if (!isBefore6pm) {
    // create a new Date object
    let currentDate = new Date();

    // add 1 day to the current date
    let tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    let res = tomorrowDate.toISOString().split("T")[0];
    return res;
  }
  let result = new Date().toISOString().split("T")[0];
  //   console.log(result);
  return result;
}

//   maybe use useeffect to call only once
const minDateVal = minDate();
const maxDateVal = maxDate();
// console.log("maxdateval",maxDateVal,"mindateval",minDateVal)

//to check if the input date is valid
//used to mitigate the issue of the date being typed in by user
function checkDateValidity(date) {
  const allowedMaxDate = new Date(maxDate());
  const allowedMinDate = new Date(minDate());
  // console.log("max",allowedMaxDate,"min",allowedMinDate)
  const inputDate = new Date(date);
  if (inputDate >= allowedMinDate && inputDate <= allowedMaxDate) {
    return true;
  } else {
    return false;
  }
}

function DatePicker({ spanText, customDivClass, customDateState }) {
  let customDateVal;
  if (!customDateState) {
    customDateVal = minDate();
  } else {
    customDateVal = customDateState;
  }
  const [date, setDate] = useState(customDateVal);
  const [dateValid, setDateValid] = useState(true);

  const handleChange = (e) => {
    let date = e.target.value;
    // console.log(date)
    if (checkDateValidity(date)) {
      setDate(date);
      setDateValid(true);
    } else {
      setDate("");
      setDateValid(false);
    }
  };

  return (
    <div className={customDivClass}>
      <label className="flex flex-col gap-1">
        <span className="text-md font-bold">{spanText}</span>
        <div className="flex items-center gap-2">
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={date}
            required={true}
            onChange={handleChange}
            className={
              HallInpputClass +
              `${dateValid ? "" : "animate-bounceleft border-red-500"}`
            }
            min={minDateVal}
            max={maxDateVal}
          ></input>
          <span>{dateValid ? <ValidIcon /> : <InvalidIcon />}</span>
        </div>
      </label>
    </div>
  );
}

export default DatePicker;
