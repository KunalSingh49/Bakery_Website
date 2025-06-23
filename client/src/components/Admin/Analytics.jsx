"use client"
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material"
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
  Star,
  CheckCircle,
  Schedule,
  CakeOutlined,
} from "@mui/icons-material"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Mock data - in real app, this would come from API
  const analyticsData = {
    revenue: {
      current: 12345.67,
      previous: 10234.56,
      change: 20.6,
      trend: "up",
    },
    orders: {
      current: 156,
      previous: 134,
      change: 16.4,
      trend: "up",
    },
    customers: {
      current: 89,
      previous: 76,
      change: 17.1,
      trend: "up",
    },
    products: {
      current: 48,
      previous: 45,
      change: 6.7,
      trend: "up",
    },
  }

  const topProducts = [
    { name: "Chocolate Birthday Cake", sales: 45, revenue: 2025.55, growth: 15.2 },
    { name: "Vanilla Wedding Cake", sales: 23, revenue: 4369.77, growth: 8.7 },
    { name: "Red Velvet Cupcakes", sales: 67, revenue: 2008.33, growth: 22.1 },
    { name: "Custom Anniversary Cake", sales: 12, revenue: 1899.88, growth: -5.3 },
    { name: "Strawberry Cheesecake", sales: 34, revenue: 1530.66, growth: 12.8 },
  ]

  const orderStatus = [
    { status: "Completed", count: 89, percentage: 57.1, color: "success" },
    { status: "In Progress", count: 34, percentage: 21.8, color: "warning" },
    { status: "Pending", count: 23, percentage: 14.7, color: "info" },
    { status: "Cancelled", count: 10, percentage: 6.4, color: "error" },
  ]

  const recentActivity = [
    { type: "order", message: "New order #ORD-156 received", time: "2 minutes ago", icon: <ShoppingCart /> },
    { type: "customer", message: "New customer Sarah Johnson registered", time: "15 minutes ago", icon: <People /> },
    { type: "product", message: "Chocolate Cake stock running low", time: "1 hour ago", icon: <Inventory /> },
    { type: "review", message: "5-star review received for Wedding Cake", time: "2 hours ago", icon: <Star /> },
    { type: "order", message: "Order #ORD-154 completed", time: "3 hours ago", icon: <CheckCircle /> },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 8500, orders: 95 },
    { month: "Feb", revenue: 9200, orders: 108 },
    { month: "Mar", revenue: 10100, orders: 125 },
    { month: "Apr", revenue: 9800, orders: 118 },
    { month: "May", revenue: 11200, orders: 142 },
    { month: "Jun", revenue: 12345, orders: 156 },
  ]

  const getChangeColor = (change) => {
    return change >= 0 ? "success.main" : "error.main"
  }

  const getChangeIcon = (trend) => {
    return trend === "up" ? <TrendingUp /> : <TrendingDown />
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 3 months</MenuItem>
            <MenuItem value="365">Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${analyticsData.revenue.current.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {getChangeIcon(analyticsData.revenue.trend)}
                    <Typography variant="body2" sx={{ color: getChangeColor(analyticsData.revenue.change), ml: 0.5 }}>
                      {analyticsData.revenue.change}%
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
                    {analyticsData.orders.current}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {getChangeIcon(analyticsData.orders.trend)}
                    <Typography variant="body2" sx={{ color: getChangeColor(analyticsData.orders.change), ml: 0.5 }}>
                      {analyticsData.orders.change}%
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
                    New Customers
                  </Typography>
                  <Typography variant="h4" component="div">
                    {analyticsData.customers.current}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {getChangeIcon(analyticsData.customers.trend)}
                    <Typography variant="body2" sx={{ color: getChangeColor(analyticsData.customers.change), ml: 0.5 }}>
                      {analyticsData.customers.change}%
                    </Typography>
                  </Box>
                </Box>
                <People sx={{ fontSize: 40, color: "#db2777" }} />
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
                    Active Products
                  </Typography>
                  <Typography variant="h4" component="div">
                    {analyticsData.products.current}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {getChangeIcon(analyticsData.products.trend)}
                    <Typography variant="body2" sx={{ color: getChangeColor(analyticsData.products.change), ml: 0.5 }}>
                      {analyticsData.products.change}%
                    </Typography>
                  </Box>
                </Box>
                <Inventory sx={{ fontSize: 40, color: "#db2777" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Top Products */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Selling Products
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Sales</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Growth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2">{product.name}</Typography>
                        </TableCell>
                        <TableCell align="right">{product.sales}</TableCell>
                        <TableCell align="right">${product.revenue.toFixed(2)}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: getChangeColor(product.growth) }}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Status Distribution */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Status Distribution
              </Typography>
              <Box sx={{ mt: 2 }}>
                {orderStatus.map((status, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">{status.status}</Typography>
                      <Typography variant="body2">
                        {status.count} ({status.percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={status.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            status.color === "success"
                              ? "#10b981"
                              : status.color === "warning"
                                ? "#f59e0b"
                                : status.color === "info"
                                  ? "#3b82f6"
                                  : "#ef4444",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Performance */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Performance
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Orders</TableCell>
                      <TableCell align="right">Avg Order Value</TableCell>
                      <TableCell align="right">Growth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyData.map((month, index) => {
                      const avgOrderValue = month.revenue / month.orders
                      const prevMonth = index > 0 ? monthlyData[index - 1] : null
                      const growth = prevMonth ? ((month.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0

                      return (
                        <TableRow key={month.month}>
                          <TableCell>{month.month}</TableCell>
                          <TableCell align="right">${month.revenue.toLocaleString()}</TableCell>
                          <TableCell align="right">{month.orders}</TableCell>
                          <TableCell align="right">${avgOrderValue.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: getChangeColor(growth) }}>
                              {growth > 0 ? "+" : ""}
                              {growth.toFixed(1)}%
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List dense>
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemIcon sx={{ color: "#db2777" }}>{activity.icon}</ListItemIcon>
                      <ListItemText
                        primary={activity.message}
                        secondary={activity.time}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Insights */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Insights
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <CakeOutlined sx={{ fontSize: 48, color: "#db2777", mb: 1 }} />
                    <Typography variant="h6">Best Selling Category</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Birthday Cakes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      45% of total sales
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Schedule sx={{ fontSize: 48, color: "#db2777", mb: 1 }} />
                    <Typography variant="h6">Peak Hours</Typography>
                    <Typography variant="body1" color="text.secondary">
                      2:00 PM - 6:00 PM
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      60% of daily orders
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Star sx={{ fontSize: 48, color: "#db2777", mb: 1 }} />
                    <Typography variant="h6">Average Rating</Typography>
                    <Typography variant="body1" color="text.secondary">
                      4.8 / 5.0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Based on 234 reviews
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
