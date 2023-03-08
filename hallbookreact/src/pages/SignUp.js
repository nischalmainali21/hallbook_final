import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HallInput from "../components/Hall/HallInput";
const buttonfixedclass = "buttonfixedclass";
const HallInpputClass = `hallinputclass `;

function SignUp() {
  const SignUpFormFields = [
    {
      labelText: "Email:",
      id: "email",
      name: "email",
      type: "email",
      isRequired: true,
      placeholder: "@pcampus.edu.np",
      minLength: 1,
    },
    {
      labelText: "First Name:",
      id: "firstName",
      name: "firstName",
      type: "text",
      isRequired: true,
      placeholder: "John",
      minLength: 1,
    },

    {
      labelText: "Last Name:",
      id: "lastName",
      name: "lastName",
      type: "text",
      isRequired: true,
      placeholder: "Doe",
      minLength: 1,
    },
    {
      labelText: "Password:",
      id: "password",
      name: "password",
      type: "password",
      isRequired: true,
      placeholder: "password",
      minLength: 1,
    },
  ];
  let inputFieldsState = {};

  SignUpFormFields.forEach((field) => (inputFieldsState[field.id] = ""));
  const [inputState, setInputState] = useState(inputFieldsState);
  const [selectedValue, setSelectedValue] = useState("student");
  const navigate = useNavigate();
  console.log(inputState, selectedValue);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.id]: e.target.value });
  };

  let submitData = async (payload) => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/user/register/", {
        method: "POST",
        body: payload,
      });
      let data = response.json();
      if (response.ok) {
        console.log("successfully registered");
        console.log(response, data);
        navigate("/login");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleSubmit(e) {
    const payload = new FormData();
    payload.append("email", e.target.email.value);
    payload.append("first_name", e.target.firstName.value);
    payload.append("last_name", e.target.lastName.value);
    payload.append("user_type", e.target.userType.value);
    payload.append("password", e.target.password.value);

    for (const [key, value] of payload) {
      console.log(key, value);
    }
    submitData(payload);
    e.preventDefault();
  }

  return (
    <div className="">
      {/* header part containing the logo and the name */}
      <div className="mt-16">
        {/* logo */}
        <div>
          <Link
            to="/"
            className="flex flex-col items-center justify-center space-x-2 px-2 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 cursor-pointer text-blue-500"
            >
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
              <path
                fillRule="evenodd"
                d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-3xl font-bold">BookHall</span>
          </Link>
        </div>
      </div>
      <div>
        <div className="mx-auto flex w-1/5 flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              {SignUpFormFields.map((field) => (
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
            <div>
              <label className="flex flex-col gap-1">
                <span className="text-base font-bold ">User Type:</span>
                <select
                  name="userType"
                  id="userType"
                  className={HallInpputClass}
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </label>
            </div>
            <button
              className={
                buttonfixedclass +
                ` mx-auto bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`
              }
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
