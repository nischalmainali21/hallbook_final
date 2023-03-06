import React from "react";
import CButton from "../CButton";

function StudentBookingCard({
  id,
  eventID,
  bookedHallID,
  startTime,
  endTime,
  verified,
  handleEditClick,
  handleCancelClick
}) {
  const buttonfixedclass = `buttonfixedclass`;

  return (
    <>
      <div className="flex flex-col justify-between rounded-lg p-2 shadow-lg md:flex-row md:items-center md:justify-between">
        <div className="flex h-36  flex-col gap-4 p-1 md:h-36">
          <div>
            <div className="text-3xl font-bold">Event Name:{eventID}</div>
            <div className="text-md">BookedHall: {bookedHallID}</div>
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
        <div className="flex md:gap-10 ">
          {verified ? null : (
            <CButton
              id={`verifyBooking${id}`}
              type="button"
              btnDesc="Edit"
              //   onClick={() => handleVerifyClick(id,bookedHallID,eventID,startTime,endTime)}
              onClick={()=>handleEditClick(id)}
            />
          )}
          <button
            id={`rejectBooking${id}`}
            type="button"
            //   onClick={() => handleRejectClick(id)}
            onClick={()=>handleCancelClick(id)}

            className={
              buttonfixedclass +
              ` bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default StudentBookingCard;
