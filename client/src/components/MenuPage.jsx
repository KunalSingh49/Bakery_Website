"use client"
import { useState } from "react"
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Badge,
  Divider,
  Rating,
} from "@mui/material"
import { ShoppingCart, Favorite, FavoriteBorder, Close, Add, Remove, Search } from "@mui/icons-material"
import Header from "../components/Header"
import Footer from "../components/Footer"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedCake, setSelectedCake] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [priceFilter, setPriceFilter] = useState("all")
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedFlavor, setSelectedFlavor] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const categories = ["All Cakes", "Birthday Cakes", "Wedding Cakes", "Cupcakes", "Custom Cakes", "Seasonal"]

  const cakes = [
    {
      id: 1,
      name: "Classic Chocolate Birthday Cake",
      category: "Birthday Cakes",
      price: 45.99,
      originalPrice: 52.99,
      image: "/placeholder.svg?height=300&width=300&text=Chocolate+Cake",
      description:
        "Rich, moist chocolate cake with layers of creamy chocolate buttercream frosting. Perfect for any birthday celebration.",
      flavors: ["Chocolate", "Dark Chocolate", "Milk Chocolate"],
      sizes: [
        { name: "6 inch (Serves 6-8)", price: 45.99, weight: "1.5 lbs" },
        { name: "8 inch (Serves 10-12)", price: 65.99, weight: "2.5 lbs" },
        { name: "10 inch (Serves 15-18)", price: 85.99, weight: "4 lbs" },
      ],
      ingredients: ["Premium cocoa powder", "Fresh eggs", "Real butter", "Vanilla extract", "Organic flour"],
      allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
      preparationTime: "24 hours",
      rating: 4.8,
      reviews: 124,
      isPopular: true,
      isNew: false,
      discount: 13,
    },
    {
      id: 2,
      name: "Elegant Vanilla Wedding Cake",
      category: "Wedding Cakes",
      price: 189.99,
      image: "/placeholder.svg?height=300&width=300&text=Wedding+Cake",
      description:
        "Three-tier vanilla sponge cake with delicate buttercream roses and elegant decorations. Customizable for your special day.",
      flavors: ["Vanilla", "Lemon", "Almond", "Strawberry"],
      sizes: [
        { name: "2-Tier (Serves 20-25)", price: 149.99, weight: "6 lbs" },
        { name: "3-Tier (Serves 40-50)", price: 189.99, weight: "10 lbs" },
        { name: "4-Tier (Serves 60-75)", price: 249.99, weight: "15 lbs" },
      ],
      ingredients: ["Madagascar vanilla", "Fresh cream", "Organic eggs", "Premium flour", "Real butter"],
      allergens: ["Eggs", "Dairy", "Gluten"],
      preparationTime: "48 hours",
      rating: 4.9,
      reviews: 89,
      isPopular: true,
      isNew: false,
    },
    {
      id: 3,
      name: "Red Velvet Cupcakes",
      category: "Cupcakes",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300&text=Red+Velvet+Cupcakes",
      description: "Dozen of moist red velvet cupcakes topped with cream cheese frosting and a hint of cocoa.",
      flavors: ["Red Velvet", "Blue Velvet", "Pink Velvet"],
      sizes: [
        { name: "6 Cupcakes", price: 18.99, weight: "1 lb" },
        { name: "12 Cupcakes", price: 29.99, weight: "2 lbs" },
        { name: "24 Cupcakes", price: 55.99, weight: "4 lbs" },
      ],
      ingredients: ["Cocoa powder", "Buttermilk", "Cream cheese", "Red food coloring", "Vanilla"],
      allergens: ["Eggs", "Dairy", "Gluten"],
      preparationTime: "12 hours",
      rating: 4.7,
      reviews: 156,
      isPopular: false,
      isNew: true,
    },
    {
      id: 4,
      name: "Custom Anniversary Cake",
      category: "Custom Cakes",
      price: 125.99,
      image: "/placeholder.svg?height=300&width=300&text=Anniversary+Cake",
      description:
        "Personalized cake designed for your anniversary celebration. Choose your flavors, decorations, and special message.",
      flavors: ["Chocolate", "Vanilla", "Strawberry", "Lemon", "Carrot", "Red Velvet"],
      sizes: [
        { name: "8 inch (Serves 10-12)", price: 125.99, weight: "3 lbs" },
        { name: "10 inch (Serves 15-18)", price: 165.99, weight: "5 lbs" },
        { name: "12 inch (Serves 25-30)", price: 205.99, weight: "7 lbs" },
      ],
      ingredients: ["Custom based on selection", "Premium decorations", "Edible flowers", "Gold leaf"],
      allergens: ["Varies by selection"],
      preparationTime: "72 hours",
      rating: 4.9,
      reviews: 67,
      isPopular: false,
      isNew: false,
    },
    {
      id: 5,
      name: "Strawberry Cheesecake",
      category: "Seasonal",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300&text=Strawberry+Cheesecake",
      description: "Creamy New York style cheesecake topped with fresh strawberries and strawberry glaze.",
      flavors: ["Strawberry", "Blueberry", "Mixed Berry", "Plain"],
      sizes: [
        { name: "6 inch (Serves 6-8)", price: 39.99, weight: "2 lbs" },
        { name: "9 inch (Serves 12-14)", price: 59.99, weight: "3.5 lbs" },
      ],
      ingredients: ["Cream cheese", "Fresh strawberries", "Graham crackers", "Heavy cream", "Vanilla"],
      allergens: ["Eggs", "Dairy", "Gluten"],
      preparationTime: "24 hours",
      rating: 4.6,
      reviews: 98,
      isPopular: false,
      isNew: true,
    },
    {
      id: 6,
      name: "Chocolate Lava Cupcakes",
      category: "Cupcakes",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300&text=Lava+Cupcakes",
      description: "Rich chocolate cupcakes with molten chocolate center, topped with chocolate ganache.",
      flavors: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
      sizes: [
        { name: "6 Cupcakes", price: 21.99, weight: "1.2 lbs" },
        { name: "12 Cupcakes", price: 34.99, weight: "2.4 lbs" },
      ],
      ingredients: ["Belgian chocolate", "Heavy cream", "Butter", "Eggs", "Premium cocoa"],
      allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
      preparationTime: "6 hours",
      rating: 4.8,
      reviews: 203,
      isPopular: true,
      isNew: false,
    },
  ]

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue)
  }

  const handleViewDetails = (cake) => {
    setSelectedCake(cake)
    setSelectedSize(cake.sizes[0].name)
    setSelectedFlavor(cake.flavors[0])
    setQuantity(1)
    setCustomMessage("")
    setDetailsOpen(true)
  }

  const handleAddToCart = (cake, customOptions = null) => {
    const item = {
      id: cake.id,
      name: cake.name,
      price: customOptions?.selectedSize
        ? cake.sizes.find((s) => s.name === customOptions.selectedSize)?.price || cake.price
        : cake.price,
      image: cake.image,
      quantity: customOptions?.quantity || 1,
      size: customOptions?.selectedSize || cake.sizes[0].name,
      flavor: customOptions?.selectedFlavor || cake.flavors[0],
      customMessage: customOptions?.customMessage || "",
    }
    setCartItems([...cartItems, item])
    setDetailsOpen(false)
  }

  const handleToggleFavorite = (cakeId) => {
    if (favorites.includes(cakeId)) {
      setFavorites(favorites.filter((id) => id !== cakeId))
    } else {
      setFavorites([...favorites, cakeId])
    }
  }

  const filteredCakes = cakes.filter((cake) => {
    const matchesCategory = selectedCategory === 0 || cake.category === categories[selectedCategory]
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under50" && cake.price < 50) ||
      (priceFilter === "50to100" && cake.price >= 50 && cake.price <= 100) ||
      (priceFilter === "over100" && cake.price > 100)
    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedCakes = [...filteredCakes].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.isPopular - a.isPopular
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const getCurrentPrice = () => {
    if (!selectedCake || !selectedSize) return selectedCake?.price || 0
    const sizeOption = selectedCake.sizes.find((s) => s.name === selectedSize)
    return sizeOption?.price || selectedCake.price
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ bgcolor: "#fdf2f8", py: 6 }}>
        <Container>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
            Our Delicious Menu
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Handcrafted cakes made with love and the finest ingredients. Perfect for every occasion.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4, flexGrow: 1 }}>
        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search cakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                  <MenuItem value="name">Name A-Z</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} label="Price Range">
                  <MenuItem value="all">All Prices</MenuItem>
                  <MenuItem value="under50">Under $50</MenuItem>
                  <MenuItem value="50to100">$50 - $100</MenuItem>
                  <MenuItem value="over100">Over $100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton>
                  <Badge badgeContent={cartItems.length} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Category Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Paper>

        {/* Cakes Grid */}
        <Grid container spacing={3}>
          {sortedCakes.map((cake) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cake.id}>
              <Card sx={{ height: "100%", position: "relative" }}>
                {/* Badges */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {cake.isNew && <Chip label="New" color="primary" size="small" />}
                  {cake.isPopular && <Chip label="Popular" sx={{ bgcolor: "#db2777", color: "white" }} size="small" />}
                  {cake.discount && <Chip label={`${cake.discount}% OFF`} color="error" size="small" />}
                </Box>

                {/* Favorite Button */}
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(255,255,255,0.9)" }}
                  onClick={() => handleToggleFavorite(cake.id)}
                >
                  {favorites.includes(cake.id) ? <Favorite sx={{ color: "#db2777" }} /> : <FavoriteBorder />}
                </IconButton>

                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <img src={cake.image || "/placeholder.svg"} alt={cake.name} fill style={{ objectFit: "cover" }} />
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                    {cake.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating value={cake.rating} readOnly size="small" />
                    <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
                      ({cake.reviews})
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                    {cake.description.substring(0, 100)}...
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Typography variant="h6" sx={{ color: "#db2777", fontWeight: "bold" }}>
                      ${cake.price}
                    </Typography>
                    {cake.originalPrice && (
                      <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                        ${cake.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" size="small" onClick={() => handleViewDetails(cake)} sx={{ flex: 1 }}>
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(cake)}
                      sx={{ flex: 1, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
                    >
                      Order Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {sortedCakes.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No cakes found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Container>

      {/* Cake Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5">{selectedCake?.name}</Typography>
            <IconButton onClick={() => setDetailsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCake && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: "relative", height: 300, mb: 2 }}>
                  <img
                    src={selectedCake.image || "/placeholder.svg"}
                    alt={selectedCake.name}
                    fill
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={selectedCake.rating} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {selectedCake.rating} ({selectedCake.reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {selectedCake.description}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Customize Your Order
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Size & Servings</InputLabel>
                  <Select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    label="Size & Servings"
                  >
                    {selectedCake.sizes.map((size, index) => (
                      <MenuItem key={index} value={size.name}>
                        {size.name} - ${size.price} ({size.weight})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Flavor</InputLabel>
                  <Select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)} label="Flavor">
                    {selectedCake.flavors.map((flavor, index) => (
                      <MenuItem key={index} value={flavor}>
                        {flavor}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Remove />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 2, minWidth: 40, textAlign: "center" }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <Add />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  label="Custom Message (Optional)"
                  multiline
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g., Happy Birthday Sarah!"
                  sx={{ mb: 3 }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Product Details
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Ingredients:
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedCake.ingredients.join(", ")}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Allergens:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  {selectedCake.allergens.map((allergen, index) => (
                    <Chip key={index} label={allergen} size="small" color="warning" />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  <strong>Preparation Time:</strong> {selectedCake.preparationTime}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                    p: 2,
                    bgcolor: "#fdf2f8",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#db2777", fontWeight: "bold" }}>
                    Total: ${(getCurrentPrice() * quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDetailsOpen(false)} size="large">
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={() =>
              handleAddToCart(selectedCake, {
                selectedSize,
                selectedFlavor,
                quantity,
                customMessage,
              })
            }
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Add to Cart - ${(getCurrentPrice() * quantity).toFixed(2)}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  )
}
