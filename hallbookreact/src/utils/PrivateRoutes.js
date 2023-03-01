import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({isuserType}) => {
  console.log("private route works");

  //user_type has been sent with response 
  //which is authTokens.user_type
  let {user,authTokens} = useContext(AuthContext)
  
  return (
    user && isuserType===authTokens.user_type?<Outlet/>:<Navigate to='/login'/>
  )
};

// const PrivateRoutes = () => {
//   console.log("private route works");

//   let {user} = useContext(AuthContext)
  
//   return (
//     user?<Outlet/>:<Navigate to='/login'/>
//   )
// };


export default PrivateRoutes;
