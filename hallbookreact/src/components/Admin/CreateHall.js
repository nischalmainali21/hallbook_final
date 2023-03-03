import React from "react";
import HallForm from "./HallForm";

function CreateHall() {
  const handleSubmit = (e) => {
    console.log(
      e.target.hallName.value,
      e.target.capacity.value,
      e.target.location.value
    );
    e.preventDefault();
  };

  return (
    <div>
      <HallForm pageTitle="New Hall Details" handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateHall;
