import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./Navbar.css";

export default function Navbar() {
  const normalClassLink =
    "px-20 md:px-2 py-2.5 hover:bg-cprimary-300 hover:text-csecond-100 rounded-md transition";
  const activeClassLink = normalClassLink + " bg-blue-200";

  const loginNormalClassLink = normalClassLink + " bg-csecond-200";

  const [isOpen, setIsOpen] = useState(false);

  let { user, logoutUser, authTokens } = useAuth();
  // console.log(authTokens);
  const userType = authTokens?.user_type || null;
  // console.log(userType)

  const handleMobileLogout = () => {
    setIsOpen(!isOpen)
    logoutUser()
  }

  const homePath =
    userType === null
      ? "/"
      : userType === "student"
      ? "/"
      : userType === "faculty"
      ? "/facultypage"
      : "/adminpage";
  // console.log(homePath)

  return (
    <div>
      <nav className="w-full rounded-sm bg-cprimary-100 px-8 py-1 text-lg text-cprimary-800 shadow-lg">
        <div className="flex items-center justify-between">
          {/* logo and primary nav */}
          <div className="flex items-center space-x-10">
            {/* logo */}
            <div>
              {/* <Link to="/" className="flex items-center space-x-2 px-2 py-5"> */}
              <Link
                to={homePath}
                className="flex items-center space-x-2 px-2 py-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 cursor-pointer text-blue-500"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path
                    fillRule="evenodd"
                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">BookHall</span>
              </Link>
            </div>
            {/* primary nav */}
            <div className="w-full">
              <ul className="hidden space-x-6 md:flex md:w-auto md:items-center">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? activeClassLink
                        : normalClassLink +
                          `${
                            userType === null
                              ? ""
                              : userType !== "student"
                              ? " hidden"
                              : ""
                          }`
                    }
                    //+ `${userType===null?"":userType!=="student"?" hidden":""}`
                  >
                    Home
                    {/* {userType===null?"Home":userType === "student"?"Home":userType === "faculty"?"FacultyHome":"AdminHome"} */}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facultypage"
                    className={({ isActive }) =>
                      isActive
                        ? activeClassLink
                        : normalClassLink +
                          `${
                            userType === null
                              ? ""
                              : userType !== "faculty"
                              ? " hidden"
                              : ""
                          }`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminpage"
                    className={({ isActive }) =>
                      isActive
                        ? activeClassLink
                        : normalClassLink +
                          `${
                            userType === null
                              ? " hidden"
                              : userType === "admin"
                              ? ""
                              : " hidden"
                          }`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* secondary nav */}
          <div className="hidden md:block">
            {user ? (
              <button
                className="rounded-md bg-rose-200 px-20 py-2.5 transition hover:bg-cprimary-300 hover:text-csecond-100 md:px-2"
                onClick={logoutUser}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassLink : loginNormalClassLink
                }
              >
                Login
              </NavLink>
            )}
          </div>
          {/* hamburger */}
          <div className="md:hidden">
            <button>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* mobile menu items */}
        {/* md:hidden min-h-[100vh] */}
        <div className={isOpen ? "md:hidden" : "hidden"}>
          <ul className="mb-6 flex flex-col items-center justify-center gap-y-6 md:w-auto">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(!isOpen)}
                className={({ isActive }) =>
                  isActive
                    ? activeClassLink
                    : normalClassLink +
                      `${
                        userType === null
                          ? ""
                          : userType !== "student"
                          ? " hidden"
                          : ""
                      }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/facultypage"
                onClick={() => setIsOpen(!isOpen)}
                className={({ isActive }) =>
                  isActive
                    ? activeClassLink
                    : normalClassLink +
                      `${
                        userType === null
                          ? ""
                          : userType !== "faculty"
                          ? " hidden"
                          : ""
                      }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
                  <NavLink
                    to="/adminpage"
                    onClick={() => setIsOpen(!isOpen)}
                    className={({ isActive }) =>
                      isActive
                        ? activeClassLink
                        : normalClassLink +
                          `${
                            userType === null
                              ? " hidden"
                              : userType === "admin"
                              ? ""
                              : " hidden"
                          }`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
            <li>
              {user ? (
                <button
                  className="rounded-md bg-rose-200 px-20 py-2.5 transition hover:bg-cprimary-300 hover:text-csecond-100 md:px-2"
                  onClick={handleMobileLogout}
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(!isOpen)}
                  className={({ isActive }) =>
                    isActive ? activeClassLink : loginNormalClassLink
                  }
                  //   className={({ isActive }) => [
                  //     "bg-yellow-400",
                  //     isActive ? activeClassLink : normalClassLink
                  //   ].join(" ")
                  // }
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
