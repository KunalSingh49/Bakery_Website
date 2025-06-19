"use client"
import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  Alert,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material"
import {
  Save,
  Security,
  Notifications,
  Store,
  Payment,
  Backup,
  Delete,
  Edit,
  Add,
  CloudUpload,
  Palette,
} from "@mui/icons-material"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function AdminSettings() {
  const [tabValue, setTabValue] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [backupDialogOpen, setBackupDialogOpen] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Sweet Delights Bakery",
    storeDescription: "Handcrafted cakes for every occasion",
    contactEmail: "info@sweetdelights.com",
    contactPhone: "(555) 123-4567",
    address: "123 Bakery Street, Sweet City, SC 12345",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    lowStockAlerts: true,
    customerReviews: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true,
  })

  // Business Settings
  const [businessSettings, setBusinessSettings] = useState({
    autoAcceptOrders: false,
    requireOrderConfirmation: true,
    allowGuestCheckout: true,
    enableReviews: true,
    enableWishlist: true,
    enableCoupons: true,
    taxRate: 8.5,
    deliveryFee: 5.99,
    freeDeliveryThreshold: 50.0,
  })

  // Staff Members
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: "John Admin", email: "john@sweetdelights.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Manager", email: "jane@sweetdelights.com", role: "Manager", status: "Active" },
    { id: 3, name: "Bob Baker", email: "bob@sweetdelights.com", role: "Staff", status: "Active" },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Staff",
    password: "",
  })

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleGeneralSettingChange = (field) => (event) => {
    setGeneralSettings({ ...generalSettings, [field]: event.target.value })
  }

  const handleNotificationSettingChange = (setting) => (event) => {
    setNotificationSettings({ ...notificationSettings, [setting]: event.target.checked })
  }

  const handleBusinessSettingChange = (setting) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setBusinessSettings({ ...businessSettings, [setting]: value })
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleAddUser = () => {
    const user = {
      id: staffMembers.length + 1,
      ...newUser,
      status: "Active",
    }
    setStaffMembers([...staffMembers, user])
    setNewUser({ name: "", email: "", role: "Staff", password: "" })
    setUserDialogOpen(false)
  }

  const handleDeleteUser = (userId) => {
    setStaffMembers(staffMembers.filter((user) => user.id !== userId))
  }

  const handleBackup = () => {
    // Backup logic here
    setBackupDialogOpen(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Admin Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab icon={<Store />} label="General" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Store />} label="Business" />
            <Tab icon={<Security />} label="Users & Security" />
            <Tab icon={<Payment />} label="Payment" />
            <Tab icon={<Palette />} label="Appearance" />
            <Tab icon={<Backup />} label="Backup & Data" />
          </Tabs>
        </Box>

        {/* General Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Store Name"
                value={generalSettings.storeName}
                onChange={handleGeneralSettingChange("storeName")}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Store Description"
                multiline
                rows={3}
                value={generalSettings.storeDescription}
                onChange={handleGeneralSettingChange("storeDescription")}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={generalSettings.contactEmail}
                onChange={handleGeneralSettingChange("contactEmail")}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Contact Phone"
                value={generalSettings.contactPhone}
                onChange={handleGeneralSettingChange("contactPhone")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={generalSettings.address}
                onChange={handleGeneralSettingChange("address")}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={generalSettings.timezone}
                  onChange={handleGeneralSettingChange("timezone")}
                  label="Timezone"
                >
                  <MenuItem value="America/New_York">Eastern Time</MenuItem>
                  <MenuItem value="America/Chicago">Central Time</MenuItem>
                  <MenuItem value="America/Denver">Mountain Time</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                </Select>
              </FormControl>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={generalSettings.currency}
                      onChange={handleGeneralSettingChange("currency")}
                      label="Currency"
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={generalSettings.language}
                      onChange={handleGeneralSettingChange("language")}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save General Settings
          </Button>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Alert Preferences
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationSettingChange("emailNotifications")}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onChange={handleNotificationSettingChange("smsNotifications")}
                  />
                }
                label="SMS Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.orderAlerts}
                    onChange={handleNotificationSettingChange("orderAlerts")}
                  />
                }
                label="New Order Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.lowStockAlerts}
                    onChange={handleNotificationSettingChange("lowStockAlerts")}
                  />
                }
                label="Low Stock Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.customerReviews}
                    onChange={handleNotificationSettingChange("customerReviews")}
                  />
                }
                label="Customer Review Notifications"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Report Frequency
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.dailyReports}
                    onChange={handleNotificationSettingChange("dailyReports")}
                  />
                }
                label="Daily Reports"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onChange={handleNotificationSettingChange("weeklyReports")}
                  />
                }
                label="Weekly Reports"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.monthlyReports}
                    onChange={handleNotificationSettingChange("monthlyReports")}
                  />
                }
                label="Monthly Reports"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save Notification Settings
          </Button>
        </TabPanel>

        {/* Business Settings */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Order Management
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.autoAcceptOrders}
                    onChange={handleBusinessSettingChange("autoAcceptOrders")}
                  />
                }
                label="Auto Accept Orders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.requireOrderConfirmation}
                    onChange={handleBusinessSettingChange("requireOrderConfirmation")}
                  />
                }
                label="Require Order Confirmation"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.allowGuestCheckout}
                    onChange={handleBusinessSettingChange("allowGuestCheckout")}
                  />
                }
                label="Allow Guest Checkout"
              />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Customer Features
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.enableReviews}
                    onChange={handleBusinessSettingChange("enableReviews")}
                  />
                }
                label="Enable Customer Reviews"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.enableWishlist}
                    onChange={handleBusinessSettingChange("enableWishlist")}
                  />
                }
                label="Enable Wishlist"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={businessSettings.enableCoupons}
                    onChange={handleBusinessSettingChange("enableCoupons")}
                  />
                }
                label="Enable Coupons"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Pricing & Delivery
              </Typography>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                value={businessSettings.taxRate}
                onChange={handleBusinessSettingChange("taxRate")}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Delivery Fee ($)"
                type="number"
                value={businessSettings.deliveryFee}
                onChange={handleBusinessSettingChange("deliveryFee")}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Free Delivery Threshold ($)"
                type="number"
                value={businessSettings.freeDeliveryThreshold}
                onChange={handleBusinessSettingChange("freeDeliveryThreshold")}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save Business Settings
          </Button>
        </TabPanel>

        {/* Users & Security */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Staff Members</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setUserDialogOpen(true)}
              sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
            >
              Add User
            </Button>
          </Box>
          <List>
            {staffMembers.map((user, index) => (
              <div key={user.id}>
                <ListItem>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <Box>
                        <Typography variant="body2">{user.email}</Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip label={user.role} size="small" />
                          <Chip
                            label={user.status}
                            size="small"
                            color={user.status === "Active" ? "success" : "default"}
                          />
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" color="error" onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < staffMembers.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </TabPanel>

        {/* Payment Settings */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Payment Methods
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Stripe Configuration
                  </Typography>
                  <TextField fullWidth label="Publishable Key" sx={{ mb: 2 }} placeholder="pk_test_..." />
                  <TextField fullWidth label="Secret Key" type="password" placeholder="sk_test_..." />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    PayPal Configuration
                  </Typography>
                  <TextField fullWidth label="Client ID" sx={{ mb: 2 }} placeholder="PayPal Client ID" />
                  <TextField fullWidth label="Client Secret" type="password" placeholder="PayPal Client Secret" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save Payment Settings
          </Button>
        </TabPanel>

        {/* Appearance Settings */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" gutterBottom>
            Theme & Branding
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Primary Color" value="#db2777" sx={{ mb: 2 }} />
              <TextField fullWidth label="Secondary Color" value="#f9a8d4" sx={{ mb: 2 }} />
              <Button variant="outlined" startIcon={<CloudUpload />} fullWidth>
                Upload Logo
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Preview
              </Typography>
              <Card sx={{ p: 2, bgcolor: "#fdf2f8" }}>
                <Typography variant="h6" sx={{ color: "#db2777", mb: 1 }}>
                  Sweet Delights Bakery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is how your brand colors will appear on the website.
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Save Appearance Settings
          </Button>
        </TabPanel>

        {/* Backup & Data */}
        <TabPanel value={tabValue} index={6}>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Backup Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Create a backup of all your store data including products, orders, and customers.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Backup />}
                    onClick={() => setBackupDialogOpen(true)}
                    sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
                  >
                    Create Backup
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Export Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Export your data in various formats for analysis or migration.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined" size="small">
                      Export Orders
                    </Button>
                    <Button variant="outlined" size="small">
                      Export Customers
                    </Button>
                    <Button variant="outlined" size="small">
                      Export Products
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Add User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  label="Role"
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddUser}
            variant="contained"
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backup Confirmation Dialog */}
      <Dialog open={backupDialogOpen} onClose={() => setBackupDialogOpen(false)}>
        <DialogTitle>Create Backup</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to create a backup of all store data?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This process may take a few minutes depending on the amount of data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackupDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBackup}
            variant="contained"
            sx={{ bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
          >
            Create Backup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
