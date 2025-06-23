// src/pages/CakeCatalog.jsx
import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
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

// Cake catalog with images
const cakeCatalog = cakeNames.map((name, index) => ({
  id: index + 1,
  name,
  price: Math.floor(Math.random() * 800) + 200,
  image: `/images/cakes/cake${index + 1}.png`,
}));

export default function CakeCatalog() {
  const navigate = useNavigate();

  const handleClick = (cake) => {
    navigate(`/cakes/${cake.id}`, { state: cake });
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: "linear-gradient(to bottom, #fdf2f8 0%, #fef6f9 100%)",
          minHeight: "100vh",
          py: 6,
          scrollBehavior: "smooth",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#db2777"
            textAlign="center"
            ml={1}
            mb={1}
          >
            Explore Our Delicious Cakes
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "#64748b", mb: 4, marginLeft:"10px", }}
          >
            Click on any cake to view more details and order now!
          </Typography>

          <Grid container spacing={4}>
            {cakeCatalog.map((cake) => (
              <Grid item xs={12} sm={6} md={3} key={cake.id}>
                <Card
                  onClick={() => handleClick(cake)}
                  sx={{
                    height: 320,
                    width:250,
                    borderRadius: 2,
                    overflow: "hidden",
                    marginLeft:"10px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
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
