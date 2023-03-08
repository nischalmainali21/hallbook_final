import React,{useState} from "react";
import { Link } from "react-router-dom";
import HallInput from "../components/Hall/HallInput";

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
  console.log(inputState);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.id]: e.target.value });
  };

  function handleSubmit(){
    console.log("submit")
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
      <div className="ml-[350px]">
        <div>
            <form onSubmit={handleSubmit}></form>
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
      </div>
    </div>
  );
}

export default SignUp;
