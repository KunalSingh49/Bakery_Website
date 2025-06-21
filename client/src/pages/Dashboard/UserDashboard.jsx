import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      sx={{
        mt: 2,
        borderRadius: 2,
        color: "#db2777",
        borderColor: "#db2777",
        "&:hover": {
          bgcolor: "#db2777",
          color: "#fff",
        },
      }}
    >
      Logout
    </Button>
  );
}