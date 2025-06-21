import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    password: "",
    securityCode: "",
  });

  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters.";
    }

    if (formData.role === "admin" && formData.securityCode !== "123456") {
      newErrors.securityCode = "Invalid security code for Admin registration.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          securityCode: formData.securityCode || "", 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`✅ ${data.message || "Account created successfully!"}`);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "user",
          securityCode: "",
        });
      } else {
        alert(`❌ ${data.message || "Signup failed."}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again later.");
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
        {/* Back Button */}
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

        {/* Glass Card */}
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
          {/* Logo */}
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

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 700, color: "#be185d", mb: 0.5 }}
          >
            Shruti's Bakery
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: "#64748b", mb: 4 }}
          >
            A Taste of Tradition
          </Typography>

          {/* Form */}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email Address", name: "email" },
            ].map(({ label, name }) => (
              <TextField
                key={name}
                name={name}
                label={label}
                fullWidth
                required
                value={formData[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: 2,
                  mb: 2,
                  input: { fontWeight: 500 },
                }}
              />
            ))}

            <TextField
              select
              fullWidth
              name="role"
              label="Select Role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                mb: 2,
                ".MuiSelect-select": { fontWeight: 500 },
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            {formData.role === "admin" && (
              <TextField
                name="securityCode"
                label="Admin Security Code"
                fullWidth
                required
                value={formData.securityCode}
                onChange={handleChange}
                error={!!errors.securityCode}
                helperText={errors.securityCode}
                sx={{ bgcolor: "#fff", borderRadius: 2, mb: 2 }}
              />
            )}

            <TextField
              name="password"
              label="Password"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ bgcolor: "#fff", borderRadius: 2, mb: 3 }}
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
              Sign Up
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 1 }}>
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#be185d",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Already have an account? Log In
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            © 2025 Shruti's Bakery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
