import { Outlet, Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ isuserType }) => {
  console.log("private route works");
  console.log("isuserType", isuserType);

  //user_type has been sent with response
  //which is authTokens.user_type
  let { user, authTokens } = useAuth();
  const location = useLocation();

  return user && isuserType === authTokens.user_type ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// const PrivateRoutes = () => {
//   console.log("private route works");

//   let {user} = useContext(AuthContext)

//   return (
//     user?<Outlet/>:<Navigate to='/login'/>
//   )
// };

export default PrivateRoutes;
