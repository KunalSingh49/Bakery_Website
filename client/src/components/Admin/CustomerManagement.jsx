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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Badge,
} from "@mui/material"
import {
  Visibility,
  Edit,
  Delete,
  Email,
  Phone,
  LocationOn,
  ShoppingBag,
  TrendingUp,
  Person,
  Block,
  CheckCircle,
  Search,
} from "@mui/icons-material"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State 12345",
      joinDate: "2022-03-15",
      totalOrders: 12,
      totalSpent: 456.78,
      status: "Active",
      lastOrder: "2023-12-15",
      avatar: "S",
      orders: [
        { id: "ORD-001", date: "2023-12-15", total: 45.99, status: "Delivered" },
        { id: "ORD-005", date: "2023-11-20", total: 89.99, status: "Delivered" },
        { id: "ORD-008", date: "2023-10-10", total: 29.99, status: "Delivered" },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, City, State 12345",
      joinDate: "2021-08-22",
      totalOrders: 8,
      totalSpent: 789.45,
      status: "Active",
      lastOrder: "2023-12-14",
      avatar: "M",
      orders: [
        { id: "ORD-002", date: "2023-12-14", total: 189.99, status: "In Progress" },
        { id: "ORD-006", date: "2023-11-15", total: 156.78, status: "Delivered" },
      ],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      phone: "(555) 456-7890",
      address: "789 Pine St, City, State 12345",
      joinDate: "2023-01-10",
      totalOrders: 15,
      totalSpent: 234.56,
      status: "Active",
      lastOrder: "2023-12-13",
      avatar: "E",
      orders: [
        { id: "ORD-003", date: "2023-12-13", total: 29.99, status: "Delivered" },
        { id: "ORD-007", date: "2023-12-01", total: 45.99, status: "Delivered" },
      ],
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      phone: "(555) 321-0987",
      address: "321 Elm St, City, State 12345",
      joinDate: "2022-11-05",
      totalOrders: 3,
      totalSpent: 123.45,
      status: "Inactive",
      lastOrder: "2023-08-15",
      avatar: "D",
      orders: [{ id: "ORD-004", date: "2023-08-15", total: 67.89, status: "Delivered" }],
    },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "",
  })

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer)
    setDetailsOpen(true)
  }

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer)
    setEditFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    })
    setEditOpen(true)
  }

  const handleSaveEdit = () => {
    setCustomers(
      customers.map((customer) => (customer.id === selectedCustomer.id ? { ...customer, ...editFormData } : customer)),
    )
    setEditOpen(false)
  }

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter((customer) => customer.id !== customerId))
  }

  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(
      customers.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
    )
  }

  const getStatusColor = (status) => {
    return status === "Active" ? "success" : "default"
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "Active").length,
    inactive: customers.filter((c) => c.status === "Inactive").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Customer Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Customer Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Person sx={{ fontSize: 40, color: "#db2777", mb: 1 }} />
              <Typography variant="h4" component="div">
                {customerStats.total}
              </Typography>
              <Typography color="text.secondary">Total Customers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircle sx={{ fontSize: 40, color: "#10b981", mb: 1 }} />
              <Typography variant="h4" component="div">
                {customerStats.active}
              </Typography>
              <Typography color="text.secondary">Active Customers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Block sx={{ fontSize: 40, color: "#f59e0b", mb: 1 }} />
              <Typography variant="h4" component="div">
                {customerStats.inactive}
              </Typography>
              <Typography color="text.secondary">Inactive Customers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 40, color: "#db2777", mb: 1 }} />
              <Typography variant="h4" component="div">
                ${customerStats.totalRevenue.toFixed(2)}
              </Typography>
              <Typography color="text.secondary">Total Revenue</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customer Tabs */}
      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Customers" />
            <Tab label="Active Customers" />
            <Tab label="VIP Customers" />
            <Tab label="Recent Activity" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#db2777" }}>{customer.avatar}</Avatar>
                        <Box>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last order: {customer.lastOrder}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{customer.email}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {customer.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>
                      <Badge badgeContent={customer.totalOrders} color="primary">
                        <ShoppingBag />
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ color: "#db2777" }}>
                        ${customer.totalSpent.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 100 }}>
                        <Select
                          value={customer.status}
                          onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleViewDetails(customer)}>
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleEditCustomer(customer)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Email />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteCustomer(customer.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {customers
              .filter((customer) => customer.status === "Active")
              .map((customer) => (
                <Grid item xs={12} md={6} lg={4} key={customer.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: "#db2777" }}>{customer.avatar}</Avatar>
                        <Box>
                          <Typography variant="h6">{customer.name}</Typography>
                          <Chip label="Active" color="success" size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {customer.email}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="body2">Orders: {customer.totalOrders}</Typography>
                        <Typography variant="body2" sx={{ color: "#db2777" }}>
                          ${customer.totalSpent.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            VIP Customers (Spent $500+)
          </Typography>
          <Grid container spacing={3}>
            {customers
              .filter((customer) => customer.totalSpent >= 500)
              .map((customer) => (
                <Grid item xs={12} md={6} key={customer.id}>
                  <Card sx={{ border: "2px solid #db2777" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: "#db2777", width: 56, height: 56 }}>{customer.avatar}</Avatar>
                        <Box>
                          <Typography variant="h6">{customer.name}</Typography>
                          <Chip label="VIP Customer" sx={{ bgcolor: "#db2777", color: "white" }} size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Member since: {customer.joinDate}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="subtitle1">{customer.totalOrders} Orders</Typography>
                        <Typography variant="h6" sx={{ color: "#db2777" }}>
                          ${customer.totalSpent.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Recent Customer Activity
          </Typography>
          <List>
            {customers
              .sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder))
              .slice(0, 10)
              .map((customer, index) => (
                <div key={customer.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#db2777" }}>{customer.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={customer.name}
                      secondary={`Last order: ${customer.lastOrder} • Total: $${customer.totalSpent.toFixed(2)}`}
                    />
                    <Chip label={customer.status} color={getStatusColor(customer.status)} size="small" />
                  </ListItem>
                  {index < 9 && <Divider />}
                </div>
              ))}
          </List>
        </TabPanel>
      </Paper>

      {/* Customer Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#db2777", width: 64, height: 64 }}>{selectedCustomer.avatar}</Avatar>
                  <Box>
                    <Typography variant="h6">{selectedCustomer.name}</Typography>
                    <Chip
                      label={selectedCustomer.status}
                      color={getStatusColor(selectedCustomer.status)}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Email sx={{ color: "#db2777" }} />
                  <Typography>{selectedCustomer.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Phone sx={{ color: "#db2777" }} />
                  <Typography>{selectedCustomer.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ color: "#db2777" }} />
                  <Typography>{selectedCustomer.address}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Customer Statistics
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">Member since: {selectedCustomer.joinDate}</Typography>
                  <Typography variant="body2">Total Orders: {selectedCustomer.totalOrders}</Typography>
                  <Typography variant="body2">Total Spent: ${selectedCustomer.totalSpent.toFixed(2)}</Typography>
                  <Typography variant="body2">Last Order: {selectedCustomer.lastOrder}</Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Orders
                </Typography>
                <List dense>
                  {selectedCustomer.orders.map((order) => (
                    <ListItem key={order.id}>
                      <ListItemText
                        primary={order.id}
                        secondary={`${order.date} • $${order.total} • ${order.status}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button startIcon={<Email />} variant="outlined">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={editFormData.address}
                onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
