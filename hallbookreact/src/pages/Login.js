import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

const loginBtnClass = `relative mx-auto block w-2/6 max-w-xs rounded-full bg-blue-500 px-6 py-4 text-base 
font-medium uppercase leading-tight text-white shadow-md  transition duration-150 ease-in-out hover:bg-blue-700
hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
focus:ring-0 active:bg-blue-800 active:shadow-lg md:mx-auto md:w-1/6 md:py-3`;

function Login() {
  let { loginUser, credentialsError } = useAuth()

  const handleSubmit = (e) => {
    console.log(e.target.userName.value, e.target.password.value);

    e.preventDefault();
    //sent to the function from authContext along with the event
    loginUser(e);
    //handle authentication of user login
  };

  return (
    <div className=" min-h-screen">
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
      {/* header ends here */}
      <div className="flex justify-center items-center m-0 p-2">{credentialsError ? (<p className="text-red-600">Invalid Credentials</p>) : (null)}</div>
      {/* the input fileds */}

      <LoginForm id="loginForm" onSubmit={handleSubmit} />

      {/* submit button */}
      <button type="submit" form="loginForm" className={loginBtnClass}>
        Sign In
      </button>
      {/* submit button ends here */}
    </div>
  );
}

export default Login;
