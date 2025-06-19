import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.png";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: "Home", type: "anchor", to: "#hero" },
    { name: "Menu", type: "anchor", to: "#menu" },
    { name: "About", type: "anchor", to: "#about" },
    { name: "Contact", type: "anchor", to: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "menu", "about", "contact"];
      for (let id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: "#ffffff", // default white background
        backdropFilter: "blur(10px)",
        px: 2,
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={logo}
            alt="Bakery Logo"
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: "bold",
              color: "#db2777",
              letterSpacing: "1px",
            }}
          >
            Shurti's Bakery
          </Typography>
        </Box>

        {/* Desktop Nav */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 4, ml: 4 }}>
            {navItems.map((item) =>
              item.type === "anchor" ? (
                <a
                  key={item.name}
                  href={item.to}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color:
                        activeSection === item.to.replace("#", "")
                          ? "#db2777"
                          : "text.primary",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "color 0.3s",
                      borderBottom:
                        activeSection === item.to.replace("#", "")
                          ? "2px solid #db2777"
                          : "none",
                      pb: "2px",
                      "&:hover": { color: "#db2777" },
                    }}
                  >
                    {item.name}
                  </Typography>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "color 0.3s",
                      "&:hover": { color: "#db2777" },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              )
            )}
          </Box>
        )}

        {/* Auth Buttons & Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isMobile && (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderColor: "#db2777",
                  color: "#db2777",
                  "&:hover": {
                    bgcolor: "#db2777",
                    color: "#fff",
                    borderColor: "#db2777",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          )}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#db2777",
                fontWeight: 600,
                px: 3,
                py: 1,
                "&:hover": {
                  bgcolor: "#be185d",
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Mobile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {navItems
            .concat({ name: "Login", type: "link", to: "/login" })
            .map((item) =>
              item.type === "link" ? (
                <MenuItem key={item.name} onClick={handleMenuClose}>
                  <Link
                    to={item.to}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.name}
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem key={item.name} onClick={handleMenuClose}>
                  <a
                    href={item.to}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.name}
                  </a>
                </MenuItem>
              )
            )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
