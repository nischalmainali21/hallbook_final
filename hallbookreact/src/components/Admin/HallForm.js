import React, { useState } from "react";
import HallInput from "../Hall/HallInput";
const buttonfixedclass = "buttonfixedclass";

function HallForm() {
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

  let inputFieldsState = {};
  HallFormFields.forEach((field) => (inputFieldsState[field.id] = ""));

  const [inputState, setInputState] = useState(inputFieldsState);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mx-auto mt-6 min-h-screen w-full max-w-3xl p-4 shadow-lg">
        <div className="text-3xl font-bold">{}</div>
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
