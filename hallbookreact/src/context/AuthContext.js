import { useState, useEffect, createContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate,useLocation } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [credentialsError, setCredentialsError] = useState(null); //for invalid credentials
  //   let [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from =location.state?.from?.pathname ||  "/";

  let loginUser = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.userName.value,
        password: e.target.password.value,
      }), //user_type
    });

    let data = await response.json();
    // console.log("data", data);
    // console.log("🚀 ~ file: AuthContext.js:21 ~ loginUser ~ response:", response)
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      //navigate("/");
      navigate(from,{replace:true})
    } else if (response.status === 400) {
      setCredentialsError(true);
    } else {
      alert("something is wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setCredentialsError(false)
    navigate("/login");
  };

  /*let updateToken = async () => {
    console.log("update token called");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
        if(loading){
            setLoading(false)
        }
  };*/

  let contextData = {
    user: user,
    authTokens: authTokens,
    credentialsError: credentialsError,
    setAuthTokens:setAuthTokens,
    setUser:setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  /*   useEffect(() => {

         if(loading){
             updateToken()
         }

     let fourMinutes = 4*60*1000
    let interval = setInterval(() => {
       if (authTokens) {
      updateToken();
     }
    },fourMinutes);
    return ()=> clearInterval(interval)
   }, [authTokens, loading]); */

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
