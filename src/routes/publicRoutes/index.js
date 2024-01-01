import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";
import { URL } from "../../constant";

// Custom route component for private routes
export const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to={URL.HOME} /> : <Outlet />;
};
