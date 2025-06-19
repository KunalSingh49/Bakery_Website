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
  } from "@mui/material";
  import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import logo from "../../assets/logo.png";
  import { useState } from "react";
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Container maxWidth="xs" sx={{ position: "relative" }}>
          {/* Back to Home Button */}
          <Link
            to="/"
            style={{
              position: "absolute",
              top: "-45px",
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
                ml: "25px",
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
            elevation={4}
            sx={{
              px: 4,
              py: 5,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src={logo}
                alt="Shruti's Bakery Logo"
                width={90}
                height={90}
                style={{ borderRadius: "50%" }}
              />
            </Box>
  
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: "bold", color: "#be185d", mb: 0.5 }}
            >
              Shruti's Bakery
            </Typography>
            <Typography
              component="h1"
              variant="body2"
              align="center"
              sx={{ color: "#64748b", mb: 3 }}
            >
              A Taste of Tradition
            </Typography>
  
            {/* Signup Form */}
            <Box component="form" noValidate>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoComplete="given-name"
                autoFocus
                sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
              />
  
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
              />
  
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
              />
  
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                sx={{ bgcolor: "white", borderRadius: 1, mb: 3 }}
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
                  py: 1.2,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#be185d" },
                }}
              >
                Sign Up
              </Button>
  
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#be185d", fontWeight: 500 }}
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
  