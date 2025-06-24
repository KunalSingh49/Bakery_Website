import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
  CssBaseline,
  TextField,
  InputAdornment,
  MenuItem,
  Slider,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// Cake names
const cakeNames = [
  "Chocolate Truffle", "Red Velvet", "Vanilla Cream", "Black Forest", "Pineapple", "Blueberry Cheesecake",
  "Strawberry Delight", "Coffee Mocha", "White Forest", "KitKat Fusion", "Oreo Dream", "Mango Mousse",
  "Ferrero Rocher", "Walnut Crunch", "Hazelnut Heaven", "Caramel Swirl", "Almond Bliss", "Fruit Fiesta",
  "Tiramisu", "Dark Chocolate", "Classic Vanilla", "Nutty Butterscotch", "Unicorn Cake", "Rainbow Layers",
  "Truffle Bomb", "Rasmalai Twist", "Irish Cream", "Thandai Treat", "Chocolate Chip", "Gulab Jamun Cake",
  "Rose Almond", "Pistachio", "Biscoff Lotus", "Swiss Roll", "Choco Lava", "Banoffee", "Cherry Cheesecake",
  "Custard Delight", "Choco Fudge", "Ice Cream Cake"
];

// Cake catalog
const cakeCatalog = cakeNames.map((name, index) => ({
  id: index + 1,
  name,
  price: Math.floor(Math.random() * 800) + 200,
  image: `/images/cakes/cake${index + 1}.png`,
}));

export default function CakeCatalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([200, 1000]);
  const [filteredCakes, setFilteredCakes] = useState(cakeCatalog);

  // Navigate to detail
  const handleClick = (cake) => {
    navigate(`/cakes/${cake.id}`, { state: cake });
  };

  // Filtering logic
  useEffect(() => {
    let results = cakeCatalog.filter((cake) =>
      cake.name.toLowerCase().includes(search.toLowerCase()) &&
      cake.price >= priceRange[0] &&
      cake.price <= priceRange[1]
    );

    if (sortOption === "nameAsc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "priceLowHigh") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredCakes(results);
  }, [search, sortOption, priceRange]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: "linear-gradient(to bottom, #fdf2f8 0%, #fef6f9 100%)",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 3,
              color: "#db2777",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#fce7f3",
              },
            }}
          >
            Back to the previous page
          </Button>

          <Typography
            variant="h4"
            fontWeight={700}
            color="#db2777"
            textAlign="center"
            mb={1}
          >
            Explore Our Delicious Cakes
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "#64748b", mb: 4 }}
          >
            Click on any cake to view more details and order now!
          </Typography>

          {/* Controls */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <TextField
              placeholder="Search delicious cakes..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#db2777" }}/>
                  </InputAdornment>
                ),
                style: { borderRadius: 12 },
              }}
              sx={{ minWidth: 250 }}
            />
          
            <TextField
              select
              label="Sort by"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              sx={{ minWidth: 200 ,borderRadius:"22px"}}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
              <MenuItem value="priceLowHigh">Price (Low–High)</MenuItem>
              <MenuItem value="priceHighLow">Price (High–Low)</MenuItem>
            </TextField>

            <Box sx={{ width: 250, px: 1 }}>
              <Typography variant="body2" sx={{ color: "#db2777", mb: 1 }}>
                Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
              </Typography>
              <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={200}
                  max={1000}
                  step={50}
                  sx={{
                    color: "#db2777",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#fff",
                      border: "2px solid #db2777",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#db2777",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#fce7f3",
                    },
                  }}
                />
            </Box>
          </Box>

          {/* Grid */}
          <Grid container spacing={4} justifyContent="center">
            {filteredCakes.map((cake) => (
              <Grid item xs={12} sm={6} md={3} key={cake.id}>
                <Card
                  onClick={() => handleClick(cake)}
                  sx={{
                    height: 320,
                    width: 250,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #f3c1d8",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 12px 30px rgba(219, 39, 119, 0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={cake.image}
                    alt={cake.name}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ color: "#be185d", mb: 0.5 }}
                    >
                      {cake.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ₹ {cake.price.toLocaleString("en-IN")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
