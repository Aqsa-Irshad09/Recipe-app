import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";
import { URL } from "../../constant";
export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={URL.SIGNIN} />;
};
