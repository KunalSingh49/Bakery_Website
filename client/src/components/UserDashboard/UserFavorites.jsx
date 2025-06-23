import { useState } from "react"
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography, Chip } from "@mui/material"
import { Delete, ShoppingCart, Favorite } from "@mui/icons-material"


export default function UserFavorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Chocolate Birthday Cake",
      price: 45.99,
      category: "Birthday Cakes",
      image: "/placeholder.svg?height=200&width=200&text=Chocolate+Cake",
      description: "Rich chocolate cake perfect for birthdays",
    },
    {
      id: 2,
      name: "Red Velvet Cupcakes",
      price: 29.99,
      category: "Cupcakes",
      image: "/placeholder.svg?height=200&width=200&text=Cupcakes",
      description: "Dozen red velvet cupcakes with cream cheese frosting",
    },
    {
      id: 3,
      name: "Vanilla Wedding Cake",
      price: 189.99,
      category: "Wedding Cakes",
      image: "/placeholder.svg?height=200&width=200&text=Wedding+Cake",
      description: "Elegant vanilla wedding cake with custom decorations",
    },
  ])

  const handleRemoveFavorite = (productId) => {
    setFavorites(favorites.filter((item) => item.id !== productId))
  }

  const handleAddToCart = (product) => {
    // Add to cart logic here
    console.log("Added to cart:", product)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Favorite Cakes
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Favorite sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Start adding cakes to your favorites to see them here
          </Typography>
          <Button variant="contained" sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}>
            Browse Menu
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    }}
                    onClick={() => handleRemoveFavorite(product.id)}
                  >
                    <Delete color="error" />
                  </IconButton>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ color: "#db2777" }}>
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
