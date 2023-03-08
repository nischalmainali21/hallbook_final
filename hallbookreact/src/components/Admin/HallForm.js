import React, { useState } from "react";
import HallInput from "../Hall/HallInput";
const buttonfixedclass = "buttonfixedclass";

function HallForm({ pageTitle, handleSubmit, formInputState }) {
  const HallFormFields = [
    {
      labelText: "Hall Name",
      id: "hallName",
      name: "hallName",
      type: "text",
      isRequired: true,
      placeholder: "A Hall",
      minLength: 1,
    },
    {
      labelText: "Capacity",
      id: "capacity",
      name: "capacity",
      type: "number",
      isRequired: true,
      placeholder: "50",
      minLength: 1,
    },
    {
      labelText: "Location",
      id: "location",
      name: "location",
      type: "text",
      isRequired: true,
      placeholder: "A Block",
      minLength: 1,
    },
  ];

  // console.log(formInputState)

  let inputFieldsState = {};
  if (!formInputState) {
    // console.log("value empty")
    HallFormFields.forEach((field) => (inputFieldsState[field.id] = ""));
  } else {
    // console.log("value obtained from another page");
    inputFieldsState = { ...formInputState };
    // console.log(inputFieldsState)
  }

  // console.log(inputFieldsState)
  // HallFormFields.forEach((field) => (inputFieldsState[field.id] = ""));

  const [inputState, setInputState] = useState(inputFieldsState);
  const [file,setFile] = useState()
  console.log(inputState);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.id]: e.target.value });
  };

  
  function handleFileChange(e) {
    
    let isImage = String(e.target.files[0]?.type).startsWith('image/')
    
    if (e.target.files && isImage) {
      setFile(e.target.files[0]);
    }
  }
  


  return (
    <>
      <div className="mx-auto mt-6 min-h-screen w-full max-w-3xl p-4 shadow-lg">
        <div className="text-3xl font-bold">{pageTitle}</div>
        <div className="text-sm text-gray-500">{}</div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* handlechange state value */}
            {HallFormFields.map((field) => (
              <HallInput
                key={field.id}
                labelText={field.labelText}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
                minLength={field.minLength}
                handleChange={handleChange}
                value={inputState[field.id]}
              />
            ))}
          </div>
           <div className="my-6 max-w-[500px]">
      <label className="flex flex-col gap-1">
        <span className="text-base font-bold">Hall Images</span>
        <div className="flex items-center justify-start">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="max-w-[300px] rounded-md border border-cprimary-500 px-4 py-3 text-cprimary-800 shadow-sm"
          />
        </div>
      </label>
    </div>
          <button
            className={
              buttonfixedclass +
              ` bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`
            }
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default HallForm;
