import jwt_decode from "jwt-decode";
import {fromUnixTime,differenceInMilliseconds} from 'date-fns'

let baseURL = "http://127.0.0.1:8000"

let originalRequest = async (url,config) => {
  url = `${baseURL}${url}`
  let response = await fetch(url,config)
  let data = response.json()
  console.log('response',data)
  return {response,data}
}


let refreshToken = async (authTokens) => {
  let response = await fetch ("http://127.0.0.1:8000/api/token/refresh/",{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"refresh":authTokens.refresh})
  })
  let data = await response.json()
  localStorage.setItem('authTokens',JSON.stringify(data))
  return data
}

let customFetcher = async (url,config={}) => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const user = jwt_decode(authTokens.access)
  const isExpired = differenceInMilliseconds(fromUnixTime(user.exp),new Date()) < 1;
  
  if(isExpired){
    authTokens = await refreshToken(authTokens)
  }

  config['headers']={
    Authorization:`Bearer ${authTokens?.access}`
  }

  console.log("before reqeust")
  let {response,data} = await originalRequest(url,config)
  console.log("after reqeust")
  return {response,data}
};

export default customFetcher