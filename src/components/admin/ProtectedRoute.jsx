import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("admin-auth") === "true";

  return isAuth ? children : <Navigate to="/admin" />;
}
