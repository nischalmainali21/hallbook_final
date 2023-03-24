import React from "react";
import HallForm from "./HallForm";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreateHall() {
  let api = useFetch();
  let submitData = async (payload) => {
    try {
      let { response, data } = await api("/api/hall/halls/create/", {
        method: "POST",
        body: payload,
      });
      if(response.ok){
        toast.success("Hall Created")
        navigate('/adminpage')
      }else if(response.status === 400){
        toast.error("File Type!")
      }
      // console.log(response, data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    const payload = new FormData(e.target);

    console.log([...payload]);
    console.log(e.target.image)
    submitData(payload);
    e.preventDefault();
    
  };

  return (
    <div>
      <HallForm pageTitle="New Hall Details" handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateHall;
