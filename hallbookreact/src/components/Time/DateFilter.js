import React from "react";
import ValidIcon from "../Icons/ValidIcon";
import InvalidIcon from "../Icons/InvalidIcon";

const HallInpputClass = `hallinputclass `;

function maxDate() {
    const today = new Date();
    const res = new Date(today.getTime() + 10 * 24 * 3600 * 1000);
    return res.toISOString().slice(0, 10);
  }
  
  function minDate() {
    let result = new Date().toISOString().split("T")[0];
  
    return result;
  }
  
  const minDateVal = minDate();
  const maxDateVal = maxDate();
  
  function checkDateValidity(date) {
    const allowedMaxDate = new Date(maxDate());
    const allowedMinDate = new Date(minDate());
    
    const inputDate = new Date(date);
    if (inputDate >= allowedMinDate && inputDate <= allowedMaxDate) {
      return true;
    } else {
      return false;
    }
  }

function DateFilter({id,name,date,handleChange}) {

    let dateValid=checkDateValidity(date)

  return (
    <div className="my-0 max-w-[137px]">
      <label>
        <div className="flex items-center gap-1">
          <input
            id={`${id}date`}
            name={`${name}date`}
            value={date}
            required={false}
            type="date"
            className={
                HallInpputClass +
                `${dateValid ? "" : "animate-bounceleft border-red-500"}`
              }
            onChange={(e)=>handleChange(e,checkDateValidity(e.target.value))}
            min={minDateVal}
            max={maxDateVal}
          />
          <span>
          {dateValid ? (
            <ValidIcon/>
          ) : (
            <InvalidIcon/>
          )}
        </span>
        </div>
      </label>
    </div>
  );
}

export default DateFilter;
