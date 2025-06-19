import { useState } from "react"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material"
import {
  Person,
  ShoppingBag,
  Favorite,
  Settings,
  CakeOutlined,
  LocalShipping,
  CheckCircle,
  Schedule,
} from "@mui/icons-material"
import Header from "../../components/Header"
import UserProfile from "../../components/UserDashboard/UserProfile"
import UserOrders from "../../components/UserDashboard/UserOrders"
import UserFavorites from "../../components/UserDashboard/UserFavorites"
import UserSettings from "../../components/UserDashboard/UserSettings"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function UserDashboard() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2023-12-15",
      status: "Delivered",
      total: "$45.99",
      items: "Chocolate Birthday Cake",
    },
    {
      id: "ORD-002",
      date: "2023-12-10",
      status: "In Progress",
      total: "$89.99",
      items: "Wedding Cake (Custom)",
    },
    {
      id: "ORD-003",
      date: "2023-12-05",
      status: "Delivered",
      total: "$29.99",
      items: "Vanilla Cupcakes (12 pack)",
    },
  ]

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 3, bgcolor: "#fdf2f8" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#db2777" }}>
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome back, Sarah!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your orders, favorites, and account settings
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <ShoppingBag sx={{ fontSize: 40, color: "#db2777", mb: 1 }} />
                <Typography variant="h4" component="div">
                  12
                </Typography>
                <Typography color="text.secondary">Total Orders</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Favorite sx={{ fontSize: 40, color: "#db2777", mb: 1 }} />
                <Typography variant="h4" component="div">
                  8
                </Typography>
                <Typography color="text.secondary">Favorites</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <CakeOutlined sx={{ fontSize: 40, color: "#db2777", mb: 1 }} />
                <Typography variant="h4" component="div">
                  3
                </Typography>
                <Typography color="text.secondary">Active Orders</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="div" sx={{ color: "#db2777" }}>
                  $234
                </Typography>
                <Typography color="text.secondary">Total Spent</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <List>
                {recentOrders.map((order, index) => (
                  <div key={order.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#fce7f3" }}>{getStatusIcon(order.status)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="subtitle1">{order.id}</Typography>
                            <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {order.items}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.date}
                            </Typography>
                          </Box>
                        }
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {order.total}
                      </Typography>
                    </ListItem>
                    {index < recentOrders.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button variant="outlined">View All Orders</Button>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="contained" fullWidth sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}>
                  Order New Cake
                </Button>
                <Button variant="outlined" fullWidth>
                  Track Order
                </Button>
                <Button variant="outlined" fullWidth>
                  View Menu
                </Button>
                <Button variant="outlined" fullWidth>
                  Contact Support
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Detailed Tabs */}
          <Grid item xs={12}>
            <Paper sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab icon={<Person />} label="Profile" />
                  <Tab icon={<ShoppingBag />} label="Orders" />
                  <Tab icon={<Favorite />} label="Favorites" />
                  <Tab icon={<Settings />} label="Settings" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <UserProfile />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <UserOrders />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <UserFavorites />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <UserSettings />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
