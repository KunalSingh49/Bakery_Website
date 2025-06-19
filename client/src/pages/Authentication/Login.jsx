import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
  } from "@mui/material";
  import { ArrowBack } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import logo from "../../assets/logo.png";
  
  export default function Login() {
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
          {/* Back to Home */}
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
              //variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                textTransform: "none",
                ml:"25px",
                borderRadius: 8,
                borderColor: "#db2777",
                //bgcolor: "#db2777",
                color: "#db2777",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#db2777",
                  color:"white"
                  //borderColor: "#64748b",
                  
                },
              }}
            >
              Back to Home
            </Button>
          </Link>
  
          {/* Login Card */}
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
  
            {/* Branding */}
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
  
            {/* Login Form */}
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                sx={{
                  input: { backgroundColor: "#fff" },
                  borderRadius: 1,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                sx={{
                  input: { backgroundColor: "#fff" },
                  borderRadius: 1,
                }}
              />
  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
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
                Log In
              </Button>
  
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <Grid item>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#be185d", fontWeight: 500 }}
                    >
                      Don't have an account? Sign Up
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
  