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
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material"
import { Visibility, Delete, LocalShipping, CheckCircle, Schedule, Cancel, Print, Email } from "@mui/icons-material"

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "(555) 123-4567",
      },
      items: [
        { name: "Chocolate Birthday Cake", quantity: 1, price: 45.99 },
        { name: "Vanilla Cupcakes", quantity: 6, price: 18.99 },
      ],
      total: 64.98,
      status: "Pending",
      date: "2023-12-15",
      deliveryDate: "2023-12-18",
      address: "123 Main St, City, State 12345",
      notes: "Please write 'Happy Birthday Sarah' on the cake",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Michael Chen",
        email: "michael@example.com",
        phone: "(555) 987-6543",
      },
      items: [{ name: "Wedding Cake (Custom)", quantity: 1, price: 189.99 }],
      total: 189.99,
      status: "In Progress",
      date: "2023-12-14",
      deliveryDate: "2023-12-20",
      address: "456 Oak Ave, City, State 12345",
      notes: "3-tier cake with roses decoration",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Emily Rodriguez",
        email: "emily@example.com",
        phone: "(555) 456-7890",
      },
      items: [{ name: "Red Velvet Cupcakes", quantity: 12, price: 29.99 }],
      total: 29.99,
      status: "Completed",
      date: "2023-12-13",
      deliveryDate: "2023-12-15",
      address: "789 Pine St, City, State 12345",
      notes: "",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("All")

  const statusOptions = ["All", "Pending", "In Progress", "Completed", "Cancelled"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success"
      case "In Progress":
        return "warning"
      case "Pending":
        return "info"
      case "Cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle />
      case "In Progress":
        return <LocalShipping />
      case "Pending":
        return <Schedule />
      case "Cancelled":
        return <Cancel />
      default:
        return <Schedule />
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setDetailsOpen(true)
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId))
  }

  const filteredOrders = statusFilter === "All" ? orders : orders.filter((order) => order.status === statusFilter)

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Order Management
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Filter Status">
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Orders Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#f59e0b" }}>
                {orders.filter((o) => o.status === "Pending").length}
              </Typography>
              <Typography color="text.secondary">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#3b82f6" }}>
                {orders.filter((o) => o.status === "In Progress").length}
              </Typography>
              <Typography color="text.secondary">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#10b981" }}>
                {orders.filter((o) => o.status === "Completed").length}
              </Typography>
              <Typography color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#db2777" }}>
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </Typography>
              <Typography color="text.secondary">Total Revenue</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Typography variant="subtitle2">{order.id}</Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{order.customer.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.customer.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">${order.total.toFixed(2)}</Typography>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleViewDetails(order)}>
                    <Visibility />
                  </IconButton>
                  <IconButton size="small">
                    <Print />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteOrder(order.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            Order Details - {selectedOrder?.id}
            <Chip
              label={selectedOrder?.status}
              color={getStatusColor(selectedOrder?.status)}
              icon={getStatusIcon(selectedOrder?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedOrder.customer.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedOrder.customer.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedOrder.customer.phone}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Delivery Address:</strong>
                </Typography>
                <Typography variant="body2">{selectedOrder.address}</Typography>
              </Grid>
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
                  <strong>Total Amount:</strong> ${selectedOrder.total.toFixed(2)}
                </Typography>
                {selectedOrder.notes && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1">
                      <strong>Special Notes:</strong>
                    </Typography>
                    <Typography variant="body2">{selectedOrder.notes}</Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                <List>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index}>
                      <ListItem>
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(
                            item.quantity * item.price
                          ).toFixed(2)}`}
                        />
                      </ListItem>
                      {index < selectedOrder.items.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button startIcon={<Email />} variant="outlined">
            Email Customer
          </Button>
          <Button startIcon={<Print />} variant="outlined">
            Print Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
