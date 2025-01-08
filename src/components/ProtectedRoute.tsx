import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "User" | "Admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== role) {
    const dashboardPath =
      user?.role === "Admin" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
