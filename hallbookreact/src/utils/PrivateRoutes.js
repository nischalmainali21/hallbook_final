import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  console.log("private route works");
  let auth = {'token':true}
  return (
    auth.token?<Outlet/>:<Navigate to='/login'/>
  )
};

export default PrivateRoutes;
