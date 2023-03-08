import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HallForm from "./HallForm";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

function EditHall() {
  const { state } = useLocation();
  const { id, hallName, capacity, location } = state[0];

  //   console.log(hallName,capacity,location)

  //   console.log(state[0].id);

  const formInputState = {
    hallName: hallName,
    capacity: capacity,
    location: location,
  };
  //   console.log(formInputState)
  const navigate = useNavigate();

  let api = useFetch();
  let submitData = async (payload) => {
    try {
      let { response, data } = await api(`/api/hall/halls/${id}/update/`, {
        method: "PUT",
        body: payload,
      });
      if(response.ok){
        toast.success("Hall Edited")
        console.log(response, data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      console.log(error)
    }
  };

  const handleSubmit = (e) => {
    const payload = new FormData(e.target);

    submitData(payload);
    console.log("submit");
    e.preventDefault();
    
  };
  return (
    <div>
      <HallForm
        pageTitle={`Edit ${hallName}`}
        handleSubmit={handleSubmit}
        formInputState={formInputState}
      />
    </div>
  );
}

export default EditHall;
