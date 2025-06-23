import { useState } from "react"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Dashboard,
  ShoppingCart,
  Add,
  People,
  TrendingUp,
  Settings,
  AttachMoney,
  Inventory,
  MoreVert,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material"
import AdminHeader from "../../components/Admin/AdminHeader"
import OrderManagement from "../../components/Admin/OrderManagement"
import ProductManagement from "../../components/Admin/ProductManagement"
import CustomerManagement from "../../components/Admin/CustomerManagement"
import AdminAnalytics from "../../components/Admin/Analytics"
import AdminSettings from "../../components/Admin/AdminSettings"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      product: "Chocolate Birthday Cake",
      amount: "$45.99",
      status: "Pending",
      date: "2023-12-15",
    },
    {
      id: "ORD-002",
      customer: "Michael Chen",
      product: "Wedding Cake (Custom)",
      amount: "$189.99",
      status: "In Progress",
      date: "2023-12-14",
    },
    {
      id: "ORD-003",
      customer: "Emily Rodriguez",
      product: "Vanilla Cupcakes",
      amount: "$29.99",
      status: "Completed",
      date: "2023-12-13",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success"
      case "In Progress":
        return "warning"
      case "Pending":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 3, bgcolor: "#fdf2f8" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#db2777" }}>
                <Dashboard sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Admin Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage orders, products, customers, and analytics
                </Typography>
              </Box>
              <Box sx={{ ml: "auto" }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
                >
                  Add New Product
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Key Metrics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" component="div">
                      $12,345
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: "success.main" }}>
                        +12.5%
                      </Typography>
                    </Box>
                  </Box>
                  <AttachMoney sx={{ fontSize: 40, color: "#db2777" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Orders
                    </Typography>
                    <Typography variant="h4" component="div">
                      156
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: "success.main" }}>
                        +8.2%
                      </Typography>
                    </Box>
                  </Box>
                  <ShoppingCart sx={{ fontSize: 40, color: "#db2777" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Products
                    </Typography>
                    <Typography variant="h4" component="div">
                      48
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: "success.main" }}>
                        +3 new
                      </Typography>
                    </Box>
                  </Box>
                  <Inventory sx={{ fontSize: 40, color: "#db2777" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Customers
                    </Typography>
                    <Typography variant="h4" component="div">
                      1,234
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: "success.main" }}>
                        +15.3%
                      </Typography>
                    </Box>
                  </Box>
                  <People sx={{ fontSize: 40, color: "#db2777" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Recent Orders</Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              <List>
                {recentOrders.map((order, index) => (
                  <ListItem
                    key={order.id}
                    secondaryAction={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                        <IconButton edge="end" onClick={handleMenuClick}>
                          <MoreVert />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#fce7f3" }}>
                        <ShoppingCart />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Typography variant="subtitle1">{order.id}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {order.customer}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">{order.product}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.date} • {order.amount}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                  <Visibility sx={{ mr: 1 }} /> View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Edit sx={{ mr: 1 }} /> Edit Order
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Delete sx={{ mr: 1 }} /> Delete Order
                </MenuItem>
              </Menu>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
                >
                  Add New Product
                </Button>
                <Button variant="outlined" fullWidth startIcon={<ShoppingCart />}>
                  Process Orders
                </Button>
                <Button variant="outlined" fullWidth startIcon={<People />}>
                  Manage Customers
                </Button>
                <Button variant="outlined" fullWidth startIcon={<TrendingUp />}>
                  View Analytics
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Management Tabs */}
          <Grid item xs={12}>
            <Paper sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                  <Tab icon={<Dashboard />} label="Overview" />
                  <Tab icon={<ShoppingCart />} label="Orders" />
                  <Tab icon={<Inventory />} label="Products" />
                  <Tab icon={<People />} label="Customers" />
                  <Tab icon={<TrendingUp />} label="Analytics" />
                  <Tab icon={<Settings />} label="Settings" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  Dashboard Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Welcome to your admin dashboard. Use the tabs above to manage different aspects of your bakery.
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <OrderManagement />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <ProductManagement />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <CustomerManagement />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <AdminAnalytics />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <AdminSettings />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
