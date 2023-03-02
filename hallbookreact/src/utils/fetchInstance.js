import jwtDecode from "jwt-decode";

let customFetcher = async () => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
};
