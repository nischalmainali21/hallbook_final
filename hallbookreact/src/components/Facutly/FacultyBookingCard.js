import React from "react";
import CButton from "../CButton";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";


function FacultyBookingCard({
  id,
  eventID,
  bookedHallID,
  startTime,
  endTime,
  verified,
  handleVerifyClick,
  handleRejectClick,
}) {
  const buttonfixedclass = `buttonfixedclass`;
  const [bookedHallName, setBookedHallName] = useState('')

  let api = useFetch();
  let getHallData = async () => {
    try {
      let { response, data } = await api(`/api/hall/halls/${bookedHallID}/`, {
        method: "GET",
      });
      if (response.ok) {
        setBookedHallName(data.hallName)
      }
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  getHallData()
  // console.log(bookedHallName)

  return (
    <div>
      <div className="flex flex-col justify-between rounded-lg p-2 shadow-lg md:flex-row md:items-center md:justify-between">
        <div className="flex h-36  flex-col gap-4 p-1 md:h-32">
          <div>
            <div className="text-3xl font-bold">Event Name:{eventID}</div>
            <div className="text-md">BookedHall: {bookedHallName}</div>
            <div className="text-md">
              EventTime: {`${startTime}-${endTime}`}
            </div>
          </div>
        </div>
        <div>
          <div className="text-md">Verified Status</div>
          <div className="text-md font-bold">
            {verified ? "verified" : "unverified"}
          </div>
        </div>
        {verified ? (
          ""
        ) : (
          <div className="flex md:gap-10 ">
            <CButton
              id={`verifyBooking${id}`}
              type="button"
              btnDesc="Verify"
              onClick={() => handleVerifyClick(id,bookedHallID,eventID,startTime,endTime)}
            />
            <button
              id={`rejectBooking${id}`}
              type="button"
              onClick={() => handleRejectClick(id)}
              className={
                buttonfixedclass +
                ` bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`
              }
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyBookingCard;
