import React from "react";
import CButton from "../CButton";

function AdminHallCard({ id, name, capacity, location,handleEditClick,handleDeleteClick }) {
  return (
    <div>
      <div className="flex flex-col rounded-lg p-4 shadow-lg md:flex-row md:items-center">
        <div className="flex h-32 w-full flex-col gap-4 p-2 md:h-28">
          <div>
            <div className="text-3xl font-bold">{name}</div>
            <div className="text-sm text-gray-500">Capacity: {capacity}</div>
            <div className="text-sm text-gray-500">Location: {location}</div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div>
            <CButton id={`editHall${id}`} type="button" btnDesc="Edit Hall" onClick = {(e)=>handleEditClick(e,id)}/>
          </div>
          <div>
            <button
              id={`deleteHall${id}`}
              type="button"
              onClick={(e)=>handleDeleteClick(e,id)}
              className="shadow-mdtransition mx-auto block rounded-lg bg-red-500 px-6 py-4 text-base 
              font-medium uppercase leading-tight text-white duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg
               focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg md:py-3"
            >
              Delete Hall
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHallCard;
