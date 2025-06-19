"use client"
import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  TextField,
  Rating,
} from "@mui/material"
import { Visibility, Refresh, RateReview, LocalShipping, CheckCircle, Schedule } from "@mui/icons-material"

export default function UserOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2023-12-15",
      status: "Delivered",
      total: 45.99,
      items: [{ name: "Chocolate Birthday Cake", quantity: 1, price: 45.99 }],
      deliveryDate: "2023-12-18",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2023-12-10",
      status: "In Progress",
      total: 89.99,
      items: [{ name: "Wedding Cake (Custom)", quantity: 1, price: 89.99 }],
      deliveryDate: "2023-12-20",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      date: "2023-12-05",
      status: "Delivered",
      total: 29.99,
      items: [{ name: "Vanilla Cupcakes (12 pack)", quantity: 1, price: 29.99 }],
      deliveryDate: "2023-12-08",
      trackingNumber: "TRK456789123",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success"
      case "In Progress":
        return "warning"
      case "Pending":
        return "info"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle />
      case "In Progress":
        return <LocalShipping />
      case "Pending":
        return <Schedule />
      default:
        return <Schedule />
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setDetailsOpen(true)
  }

  const handleReviewOpen = (order) => {
    setSelectedOrder(order)
    setReviewOpen(true)
  }

  const handleReviewSubmit = () => {
    // Submit review logic here
    setReviewOpen(false)
    setRating(0)
    setReview("")
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Order {order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed on {order.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Delivery: {order.deliveryDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      icon={getStatusIcon(order.status)}
                    />
                    <Typography variant="h6" sx={{ color: "#db2777" }}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Items:
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button size="small" startIcon={<Visibility />} onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                  {order.status === "In Progress" && (
                    <Button size="small" startIcon={<Refresh />}>
                      Track Order
                    </Button>
                  )}
                  {order.status === "Delivered" && (
                    <Button size="small" startIcon={<RateReview />} onClick={() => handleReviewOpen(order)}>
                      Write Review
                    </Button>
                  )}
                  <Button size="small" variant="outlined">
                    Reorder
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Information
                </Typography>
                <Typography variant="body1">
                  <strong>Order Date:</strong> {selectedOrder.date}
                </Typography>
                <Typography variant="body1">
                  <strong>Delivery Date:</strong> {selectedOrder.deliveryDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong>{" "}
                  <Chip label={selectedOrder.status} color={getStatusColor(selectedOrder.status)} size="small" />
                </Typography>
                <Typography variant="body1">
                  <strong>Tracking Number:</strong> {selectedOrder.trackingNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List>
                  {selectedOrder.items.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(2)}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ color: "#db2777" }}>
                    ${selectedOrder.total.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              How was your experience with {selectedOrder?.items[0]?.name}?
            </Typography>
            <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} size="large" sx={{ mb: 2 }} />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewOpen(false)}>Cancel</Button>
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
