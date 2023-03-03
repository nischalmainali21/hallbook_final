import React from "react";
import HallForm from "./HallForm";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

function CreateHall() {
  let api = useFetch();
  let submitData = async (payload) => {
    try {
      let { response, data } = await api("/api/hall/halls/create/", {
        method: "POST",
        body: payload,
      });
      console.log(response, data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    const payload = new FormData(e.target);

    // console.log([...payload]);

    submitData(payload);
    // navigate('/adminpage')
    e.preventDefault();
    navigate('/')
  };

  return (
    <div>
      <HallForm pageTitle="New Hall Details" handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateHall;
