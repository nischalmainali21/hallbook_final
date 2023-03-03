import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";
import { fromUnixTime, differenceInMilliseconds } from "date-fns";

let useFetch = () => {
  let { authTokens, setAuthTokens, setUser } = useAuth();

  let baseURL = "http://127.0.0.1:8000";

  let originalRequest = async (url, config) => {
    console.log("config", config);

    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    console.log("response", data);
    console.log(authTokens);
    return { response, data };
  };

  let refreshToken = async (authTokens) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });
    let data = await response.json();
    localStorage.setItem("authTokens", JSON.stringify(data));
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    return data;
  };

  let callFetch = async (url, config) => {
    const user = jwt_decode(authTokens.access);
    const isExpired =
      differenceInMilliseconds(fromUnixTime(user.exp), new Date()) < 1;

    if (isExpired) {
      authTokens = await refreshToken(authTokens);
    }

    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
    };

    let { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
