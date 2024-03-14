import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ allowedRoles }) {
    
    const { user } = useAuth();
  
    if (user) {
      return <Outlet />;
    } else {
      return <Navigate to="/"/>;
    }
  }
  
  export default RequireAuth;
  