"use client"
import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material"
import { Add, Edit, Delete, Visibility, CloudUpload, Save, Cancel, Image as ImageIcon } from "@mui/icons-material"

export default function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chocolate Birthday Cake",
      category: "Birthday Cakes",
      price: 45.99,
      stock: 12,
      status: "Active",
      image: "/placeholder.svg?height=200&width=200&text=Chocolate+Cake",
      description: "Rich chocolate cake perfect for birthdays",
    },
    {
      id: 2,
      name: "Vanilla Wedding Cake",
      category: "Wedding Cakes",
      price: 189.99,
      stock: 5,
      status: "Active",
      image: "/placeholder.svg?height=200&width=200&text=Wedding+Cake",
      description: "Elegant vanilla wedding cake with custom decorations",
    },
    {
      id: 3,
      name: "Red Velvet Cupcakes",
      category: "Cupcakes",
      price: 29.99,
      stock: 24,
      status: "Active",
      image: "/placeholder.svg?height=200&width=200&text=Cupcakes",
      description: "Dozen red velvet cupcakes with cream cheese frosting",
    },
  ])

  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'table'
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  })

  const categories = ["Birthday Cakes", "Wedding Cakes", "Cupcakes", "Custom Cakes", "Pastries"]

  const handleOpen = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingProduct(null)
  }

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: imageUrl })
    }
  }

  const handleSave = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: Number.parseFloat(formData.price),
                stock: Number.parseInt(formData.stock),
              }
            : p,
        ),
      )
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        status: "Active",
      }
      setProducts([...products, newProduct])
    }
    handleClose()
  }

  const handleDelete = (productId) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const getStatusColor = (status) => {
    return status === "Active" ? "success" : "default"
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Product Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant={viewMode === "grid" ? "contained" : "outlined"}
            onClick={() => setViewMode("grid")}
            size="small"
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "table" ? "contained" : "outlined"}
            onClick={() => setViewMode("table")}
            size="small"
          >
            Table View
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" sx={{ color: "#db2777" }}>
                      ${product.price}
                    </Typography>
                    <Chip label={product.status} color={getStatusColor(product.status)} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock} | Category: {product.category}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <IconButton size="small" onClick={() => handleOpen(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar variant="rounded" sx={{ width: 60, height: 60 }}>
                      <Image src={product.image || "/placeholder.svg"} alt={product.name} width={60} height={60} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Chip label={product.status} color={getStatusColor(product.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpen(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={handleInputChange("category")} label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={handleInputChange("price")}
                InputProps={{ startAdornment: "$" }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                value={formData.stock}
                onChange={handleInputChange("stock")}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange("description")}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="outlined" component="label" startIcon={<CloudUpload />}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
                {formData.image && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ImageIcon />
                    <Typography variant="body2">Image selected</Typography>
                  </Box>
                )}
              </Box>
              {formData.image && (
                <Box sx={{ mt: 2, maxWidth: 200 }}>
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    width={200}
                    height={150}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<Save />}
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            {editingProduct ? "Update" : "Add"} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
