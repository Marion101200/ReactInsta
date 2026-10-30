
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute() {
  const { estConnecte } = useAuth();

  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
