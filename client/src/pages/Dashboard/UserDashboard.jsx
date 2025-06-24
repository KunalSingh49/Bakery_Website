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
  Modal,
} from "@mui/material";
import {
  AccountCircle,
  Search,
  History as HistoryIcon,
  LocalShipping as TrackIcon,
  Cake as CakeIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";

// Cake names (40)
const cakeNames = [
  "Chocolate Truffle", "Red Velvet", "Vanilla Cream", "Black Forest", "Pineapple", "Blueberry Cheesecake",
  "Strawberry Delight", "Coffee Mocha", "White Forest", "KitKat Fusion", "Oreo Dream", "Mango Mousse",
  "Ferrero Rocher", "Walnut Crunch", "Hazelnut Heaven", "Caramel Swirl", "Almond Bliss", "Fruit Fiesta",
  "Tiramisu", "Dark Chocolate", "Classic Vanilla", "Nutty Butterscotch", "Unicorn Cake", "Rainbow Layers",
  "Truffle Bomb", "Rasmalai Twist", "Irish Cream", "Thandai Treat", "Chocolate Chip", "Gulab Jamun Cake",
  "Rose Almond", "Pistachio", "Biscoff Lotus", "Swiss Roll", "Choco Lava", "Banoffee", "Cherry Cheesecake",
  "Custard Delight", "Choco Fudge", "Ice Cream Cake"
];

// Create cake data
const cakesData = cakeNames.map((name, index) => ({
  id: index + 1,
  name,
  image: `/images/cakes/cake${index + 1}.png`, // Make sure these exist
  description: "Delicious and freshly baked for your special moments.",
  price: Math.floor(Math.random() * 701) + 299, // ₹299 - ₹999
}));

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";

  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...cakesData].sort(() => 0.5 - Math.random());
    const results = shuffled.filter((cake) =>
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

  const handleCardClick = (cake) => {
    setSelectedCake(cake);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCake(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fff0f6, #fdeff4, #f3f4f6)",
        pb: 5,
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ bgcolor: "#db2777", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
      >
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={logo}
              alt="Logo"
              width={48}
              height={48}
              sx={{ mr: 2 }}
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Welcome, {username}!
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} alignItems="center">
            <Link to="/cakes" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<CakeIcon />}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Cakes
              </Button>
            </Link>
            <Button
              startIcon={<HistoryIcon />}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Order History
            </Button>
            <Button
              startIcon={<TrackIcon />}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
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
      <Paper
        elevation={3}
        sx={{
          p: 2,
          m: 4,
          mx: "auto",
          width: { xs: "90%", sm: "70%" },
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
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
      <Grid container spacing={4} justifyContent="center" px={{ xs: 2, sm: 4 }}>
        {filteredCakes.map((cake) => (
          <Grid item xs={12} sm={6} md={4} key={cake.id}>
            <Card
              onClick={() => handleCardClick(cake)}
              sx={{
                height: 380,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 4,
                boxShadow: "0 6px 20px rgba(219, 39, 119, 0.2)",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardMedia
                component="img"
                image={cake.image}
                alt={cake.name}
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700} color="#db2777">
                  {cake.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  ₹{cake.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {cake.description}
                </Typography>
                <Button
                fullWidth
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents Card's onClick
                  navigate("/order-page", { state: cake });
                }}
                sx={{
                  mt: 1,
                  bgcolor: "#db2777",
                  borderRadius: 3,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#be185d" },
                }}
              >
                Order Now
              </Button>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Cake Preview */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: 24,
            p: 2,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <IconButton
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#db2777",
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedCake && (
            <>
              <Box
                component="img"
                src={selectedCake.image}
                alt={selectedCake.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="h6"
                fontWeight={700}
                mt={2}
                textAlign="center"
                color="#db2777"
              >
                {selectedCake.name}
              </Typography>
              <Typography variant="body2" textAlign="center" color="text.secondary">
                {selectedCake.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
