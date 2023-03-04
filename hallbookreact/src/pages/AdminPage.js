import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminHallCard from "../components/Admin/AdminHallCard";
import useFetch from "../hooks/useFetch";

const buttonfixedclass = `buttonfixedclass`;

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let getHallList = async () => {
      try {
        console.log("Reqeust Ran");
        const response = await fetch("http://127.0.0.1:8000/api/hall/halls/");
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("error", error);
        setError(error);
      }
    };
    // setInterval(() => {
    //   getHallList();
    // }, 10000);
    getHallList()
  }, []);

  let api = useFetch();
  let deleteData = async (id) => {
    try {
      let { response} = await api(`/api/hall/halls/${id}/delete/`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  console.log(data)
  if (loading) return "Loading";
  if (error) return "error";

  

  const handleNewHallClick = () => {
    navigate("/adminpage/createhall");
  };

  const handleEditClick = (id) => {
    const res = data.filter(item=> item.id === id)
    console.log(res)
    navigate('/adminpage/edithall',{state:{...res}})
    console.log("edit",id)
  }

  const handleDeleteClick = (id) => {
    console.log("delete",id)
    deleteData(id)
    navigate(0)
  }

  return (
    <div className="grid-cols-[200px_1fr] md:grid">
      <div className="mt-6 md:mt-16">
        <div>
          <button
            onClick={handleNewHallClick}
            className={
              buttonfixedclass +
              ` mx-auto bg-green-500 text-black hover:bg-green-700 focus:bg-green-700 active:bg-green-800`
            }
          >
            Add New Hall
          </button>
        </div>
      </div>
      <div className="mx-auto  mt-2 flex min-h-screen max-w-3xl flex-col gap-12 p-2 md:mt-14  md:w-2/3 md:gap-8">
        {data.map((item) => (
          <AdminHallCard
            key={item.id}
            id={item.id}
            name={item.hallName}
            capacity={item.capacity}
            location={item.location}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
