import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUserContext";

// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/pna", children }) {
  const { currentUser } = useCurrentUserContext()

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
