import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";

interface GuestRouteProps {
  children: JSX.Element;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (token) {
    const dashboardPath =
      user?.role === "Admin" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default GuestRoute;
