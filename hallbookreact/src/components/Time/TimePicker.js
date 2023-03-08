import React, { useState } from "react";
import ValidIcon from "../Icons/ValidIcon";
import InvalidIcon from "../Icons/InvalidIcon";

const InpputClass = `hallinputclass `;

function checkStartTimeValid(timeVal) {
  const allowedMinTime = new Date();
  allowedMinTime.setHours(6, 0);
  const allowedMaxTime = new Date();
  allowedMaxTime.setHours(17, 29);
  let [hoursVal, minutesVal] = timeVal.split(":");
  let inputDate = new Date();
  inputDate.setHours(hoursVal, minutesVal);
  if (inputDate >= allowedMinTime && inputDate <= allowedMaxTime) {
    return true;
  } else {
    return false;
  }
}

function checkEndTimeValid(timeVal, startTimeVal) {
  let [startTimeValHours, startTimeValMinutes] = startTimeVal.split(":");

  const allowedMinTime = new Date();
  allowedMinTime.setHours(
    Number(startTimeValHours),
    Number(startTimeValMinutes)
  );

  const allowedMaxTime = new Date();
  allowedMaxTime.setHours(18, 0);

  let inputDate = new Date();
  let [timeValHours, timeValMinutes] = timeVal.split(":");

  inputDate.setHours(timeValHours, timeValMinutes);
  if (inputDate >= allowedMinTime && inputDate <= allowedMaxTime) {
    return true;
  } else {
    return false;
  }
}

//func to calculate the next time of step 3600
//06:00 --> 07:00
function calculateMinEndTime(timeVal) {
  let [startHours] = timeVal.split(":");
  let numStartHours = Number(startHours);
  let endTimeVal = `${numStartHours >= 9 ? "" : "0"}${numStartHours + 1}:00`;
  return endTimeVal;
}

//func to generate the array of datalist for the end time picker
/*function endDataList(timeVal, _dataList = []) {
  if (Number(timeVal.split(":")[0]) === 18) {
    return;
  } else {
    let newVal = calculateMinEndTime(timeVal);
    _dataList.push(newVal);
    endDataList(newVal, _dataList);
  }
  return _dataList;
}*/

function TimePicker({ customStartTimeState, customEndTimeState }) {
  // console.log(customEndTimeState,customStartTimeState)
  let customStartTimeVal;
  let customEndTimeVal;
  if (!customStartTimeState) {
    customStartTimeVal = "06:00"; //subject to change according to the current time
  } else {
    customStartTimeVal = customStartTimeState;
  }

  const [startTime, setStartTime] = useState(customStartTimeVal);
  const [startTimeValid, setStartTimeValid] = useState(true);

  let minEndTime = calculateMinEndTime(startTime);
  if (!customEndTimeState) {
    customEndTimeVal = minEndTime; //subject to change according to the current time
  } else {
    customEndTimeVal = customEndTimeState;
  }

  const [endTime, setEndTime] = useState(customEndTimeVal);
  const [endTimeValid, setEndTimeValid] = useState(true);

  const handleStartTimeChange = (e) => {
    let tempStartTime = e.target.value;
    if (checkStartTimeValid(tempStartTime)) {
      setStartTime(tempStartTime);
      setStartTimeValid(true);
      setEndTime(calculateMinEndTime(tempStartTime));
    } else {
      setStartTime("");
      setStartTimeValid(false);
    }
  };

  const handleendTimeChange = (e) => {
    let tempEndTime = e.target.value;
    if (checkEndTimeValid(tempEndTime, startTime)) {
      setEndTime(e.target.value);
      setEndTimeValid(true);
    } else {
      setEndTime("");
      setEndTimeValid(false);
    }
  };

  return (
    <>
      {/* start time picker*/}
      <div className="my-6 max-w-[500px]">
        <label className="flex flex-col gap-1">
          <span className="text-md font-bold ">Event Start Time:</span>
          <div className="flex items-center gap-2">
            <input
              type="time"
              id="eventStartTime"
              name="eventStartTime"
              required
              value={startTime}
              onChange={handleStartTimeChange}
              min={"06:00"}
              max="17:00"
              pattern="[0-9]{2}:[0-9]{2}"
              list="startHours"
              className={
                InpputClass +
                `${startTimeValid ? "" : "animate-bounceleft border-red-500"}`
              }
            />
            <span>{startTimeValid ? <ValidIcon /> : <InvalidIcon />}</span>
          </div>
        </label>

        {/* the sugggestion for the start hours */}
        <datalist id="startHours">
          <option value="06:00"></option>
          <option value="07:00"></option>
          <option value="08:00"></option>

          <option value="09:00"></option>
          <option value="10:00"></option>
          <option value="11:00"></option>
          <option value="12:00"></option>
          <option value="13:00"></option>

          <option value="14:00"></option>
          <option value="15:00"></option>
          <option value="16:00"></option>
          <option value="17:00"></option>
        </datalist>
      </div>
      {/* start time picker ends here */}

      {/* end time */}
      <div className="my-6 max-w-[500px]">
        <label className="flex flex-col gap-1">
          <span className="text-md font-bold ">Event End Time:</span>
          <div className="flex items-center gap-2">
            <input
              type="time"
              id="eventendTime"
              name="eventendTime"
              required
              value={endTime}
              onChange={handleendTimeChange}
              min={minEndTime}
              max="18:00"
              pattern="[0-9]{2}:[0-9]{2}"
              list="endHours"
              className={
                InpputClass +
                `${endTimeValid ? "" : "animate-bounceleft border-red-500"}`
              }
            />
            <span>{endTimeValid ? <ValidIcon /> : <InvalidIcon />}</span>
          </div>
        </label>

        {/* the sugggestion for the end hours */}
        <datalist id="endHours">
          <option value="06:00"></option>
          <option value="07:00"></option>
          <option value="08:00"></option>

          <option value="09:00"></option>
          <option value="10:00"></option>
          <option value="11:00"></option>
          <option value="12:00"></option>
          <option value="13:00"></option>

          <option value="14:00"></option>
          <option value="15:00"></option>
          <option value="16:00"></option>
          <option value="17:00"></option>
          <option value="18:00"></option>
        </datalist>
      </div>
      {/* end time picker ends here */}
    </>
  );
}

export default TimePicker;
