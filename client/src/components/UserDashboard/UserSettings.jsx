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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { Save, Security, Notifications, Delete } from "@mui/icons-material"

export default function UserSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    orderUpdates: true,
    newsletter: false,
  })

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSettingChange = (setting) => (event) => {
    setSettings({ ...settings, [setting]: event.target.checked })
  }

  const handlePasswordChange = (field) => (event) => {
    setPasswords({ ...passwords, [field]: event.target.value })
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handlePasswordUpdate = () => {
    // Password update logic here
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    // Reset form
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteAccount = () => {
    // Account deletion logic here
    setDeleteDialogOpen(false)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Notifications sx={{ mr: 1, color: "#db2777" }} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange("emailNotifications")}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch checked={settings.smsNotifications} onChange={handleSettingChange("smsNotifications")} />
                  }
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={<Switch checked={settings.orderUpdates} onChange={handleSettingChange("orderUpdates")} />}
                  label="Order Updates"
                />
                <FormControlLabel
                  control={
                    <Switch checked={settings.promotionalEmails} onChange={handleSettingChange("promotionalEmails")} />
                  }
                  label="Promotional Emails"
                />
                <FormControlLabel
                  control={<Switch checked={settings.newsletter} onChange={handleSettingChange("newsletter")} />}
                  label="Newsletter"
                />
              </Box>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveSettings}
                sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Security sx={{ mr: 1, color: "#db2777" }} />
                <Typography variant="h6">Security Settings</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange("currentPassword")}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange("newPassword")}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange("confirmPassword")}
                />
              </Box>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handlePasswordUpdate}
                sx={{ mt: 3, bgcolor: "#db2777", "&:hover": { bgcolor: "#be185d" } }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Management
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your account data and preferences. You can download your data or delete your account.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="outlined">Download My Data</Button>
                <Button variant="outlined">Export Order History</Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            All your order history, favorites, and personal data will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
