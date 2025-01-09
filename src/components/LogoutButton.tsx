import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast({
      title: "Logged out successfully",
    });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
