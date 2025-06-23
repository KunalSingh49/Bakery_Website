import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Store token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.firstName);

      // ✅ Navigate to respective dashboard
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f6 0%, #fce7f3 50%, #f8fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Link
          to="/"
          style={{
            position: "absolute",
            top: "-50px",
            left: 0,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            sx={{
              textTransform: "none",
              ml: "20px",
              borderRadius: 8,
              borderColor: "#db2777",
              color: "#db2777",
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#db2777",
                color: "white",
              },
            }}
          >
            Back to Home
          </Button>
        </Link>

        <Paper
          elevation={6}
          sx={{
            px: { xs: 4, sm: 6 },
            py: 5,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 25px 40px rgba(219, 39, 119, 0.15)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img
              src={logo}
              alt="Shruti's Bakery Logo"
              width={90}
              height={90}
              style={{
                borderRadius: "50%",
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Box>

          <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: "#be185d", mb: 0.5 }}>
            Shruti's Bakery
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ color: "#64748b", mb: 4 }}>
            A Taste of Tradition
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              variant="outlined"
              sx={{ bgcolor: "#fff", borderRadius: 2, mb: 2, input: { fontWeight: 500 } }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              sx={{ bgcolor: "#fff", borderRadius: 2, mb: 2, input: { fontWeight: 500 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                bgcolor: "#db2777",
                fontWeight: 600,
                fontSize: "1rem",
                py: 1.3,
                borderRadius: 3,
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#be185d",
                  transform: "translateY(-2px) scale(1.01)",
                },
              }}
            >
              Log In
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 1 }}>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#be185d", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}
                  >
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            © 2025 Shruti's Bakery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
