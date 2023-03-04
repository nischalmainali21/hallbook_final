import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HallForm from "./HallForm";
import useFetch from "../../hooks/useFetch";

function EditHall() {
  const  {state}  = useLocation();
  const { id,hallName, capacity, location } = state[0];

//   console.log(hallName,capacity,location)

//   console.log(state[0].id);

  const formInputState = {
    hallName: hallName,
    capacity: capacity,
    location: location,
  };
//   console.log(formInputState)
const navigate = useNavigate()

let api = useFetch();
  let submitData = async (payload) => {
    try {
      let { response, data } = await api(`/api/hall/halls/${id}/update/`, {
        method: "PUT",
        body: payload,
      });
      console.log(response, data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {

    const payload = new FormData(e.target)

    submitData(payload);
    console.log("submit");
    e.preventDefault()
    navigate('/')
  };
  return (
    <div>
      <HallForm pageTitle={`Edit ${hallName}`} handleSubmit={handleSubmit} formInputState={formInputState}/>
    </div>
  );
}

export default EditHall;
