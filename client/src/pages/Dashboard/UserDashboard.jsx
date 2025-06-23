import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import {
  AccountCircle,
  Search,
  History as HistoryIcon,
  LocalShipping as TrackIcon,
  Cake as CakeIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const cakesData = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    image: "https://source.unsplash.com/400x300/?chocolate-cake",
    description: "Rich chocolate cake layered with ganache.",
  },
  {
    id: 2,
    name: "Vanilla Cream Cake",
    image: "https://source.unsplash.com/400x300/?vanilla-cake",
    description: "Classic vanilla cake with whipped cream.",
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    image: "https://source.unsplash.com/400x300/?red-velvet-cake",
    description: "Moist red velvet with cream cheese frosting.",
  },
];

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredCakes, setFilteredCakes] = useState(cakesData);

  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    const results = cakesData.filter((cake) =>
      cake.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCakes(results);
  }, [search]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #fff0f6, #fdeff4, #f3f4f6)", pb: 5 }}>
      
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#db2777", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}>
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={logo} alt="Logo" sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Welcome, {username}!
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} alignItems="center">
          <Link to="/cakes" style={{ textDecoration: "none" }}>
            <Button startIcon={<CakeIcon />} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
              Cakes
            </Button>
          </Link>
            <Button startIcon={<HistoryIcon />} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
              Order History
            </Button>
            <Button startIcon={<TrackIcon />} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
              Track Order
            </Button>

            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => alert("Update Profile Clicked")}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} /> Update Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <Paper elevation={3} sx={{ p: 2, m: 4, mx: "auto", width: { xs: "90%", sm: "70%" }, borderRadius: 4, backgroundColor: "#fff" }}>
        <TextField
          placeholder="Search delicious cakes..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#db2777" }} />
              </InputAdornment>
            ),
            style: { borderRadius: 12 },
          }}
        />
      </Paper>

      {/* Cakes Grid */}
      <Grid container spacing={4} px={4}>
        {filteredCakes.map((cake) => (
          <Grid item xs={12} sm={6} md={4} key={cake.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 6px 20px rgba(219, 39, 119, 0.2)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardMedia component="img" height="200" image={cake.image} alt={cake.name} />
              <CardContent>
                <Typography variant="h6" fontWeight={700} color="#db2777">
                  {cake.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {cake.description}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, bgcolor: "#db2777", borderRadius: 3, fontWeight: 600, "&:hover": { bgcolor: "#be185d" } }}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
