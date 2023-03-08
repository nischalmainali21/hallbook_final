import React, { useEffect, useState } from "react";
import CButton from "../CButton";
import useFetch from "../../hooks/useFetch";

function StudentBookingCard({
  id,
  eventID,
  bookedHallID,
  startTime,
  endTime,
  eventDate,
  verified,
  rejected,
  handleEditClick,
  handleCancelClick,
}) {
  const buttonfixedclass = `buttonfixedclass`;
  const [eventData, setEventData] = useState([]);
  const [bookedHallName, setBookedHallName] = useState("");

  let api = useFetch();

  useEffect(() => {
    let getHallData = async () => {
      try {
        let { response, data } = await api(`/api/hall/halls/${bookedHallID}/`, {
          method: "GET",
        });
        if (response.ok) {
          setBookedHallName(data.hallName);
        }
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    let getEventData = async () => {
      try {
        let { response, data } = await api(`/api/hall/events/${eventID}/`, {
          method: "GET",
        });
        if (response.ok) {
          setEventData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEventData();
    getHallData();
  }, [bookedHallID, eventID]);

  let borderclass = verified ? "border-green-200" : "border-yellow-200";
  return (
    <>
      <div
        className={
          `flex flex-col items-baseline justify-between rounded-lg border-y-2 p-2 shadow-lg md:flex-row md:items-center md:justify-between ` +
          borderclass
        }
      >
        <div className="flex h-36  flex-col gap-4 p-1 md:h-40">
          <div className="text-align flex flex-col gap-1">
            <div className="text-md">
              Event Name:{" "}
              <span className="font-bold">{eventData.eventName}</span>
            </div>
            <div className="text-md">
              BookedHall: <span className="font-bold">{bookedHallName}</span>
            </div>

            <div className="text-md">
              Event Date: <span className="font-bold">{eventDate}</span>
            </div>
            <div className="text-md">
              EventTime:{" "}
              <span className="font-bold">{`${startTime}-${endTime}`}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-md">Status</div>
          <div className="text-md font-bold">
            {/* {verified ? "Verified" : "Unverified"} */}
            {rejected?"Rejected":verified?"Verified":"Unverified"}
          </div>
        </div>
        <div className="flex md:gap-10 ">
          {rejected ? null : verified ? (
            <button
              id={`cancelBooking${id}`}
              type="button"
              //   onClick={() => handleRejectClick(id)}
              onClick={() => handleCancelClick(id, eventID, verified)}
              className={
                buttonfixedclass +
                ` bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`
              }
            >
              Cancel
            </button>
          ) : (
            <div className="flex gap-2">
              <CButton
                id={`editBooking${id}`}
                type="button"
                btnDesc="Edit"
                //   onClick={() => handleVerifyClick(id,bookedHallID,eventID,startTime,endTime)}
                onClick={() => handleEditClick(id, eventID)}
              />
              <button
                id={`cancelBooking${id}`}
                type="button"
                //   onClick={() => handleRejectClick(id)}
                onClick={() => handleCancelClick(id, eventID, verified)}
                className={
                  buttonfixedclass +
                  ` bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`
                }
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentBookingCard;
