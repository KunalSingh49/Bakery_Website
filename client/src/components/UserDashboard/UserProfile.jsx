"use client"
import { useState } from "react"
import { Box, Button, Grid, TextField, Typography, Avatar, Paper, Divider, IconButton } from "@mui/material"
import { Edit, Save, Cancel, PhotoCamera } from "@mui/icons-material"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "Sweet City",
    state: "SC",
    zipCode: "12345",
    birthday: "1990-05-15",
  })

  const handleInputChange = (field) => (event) => {
    setProfileData({ ...profileData, [field]: event.target.value })
  }

  const handleSave = () => {
    // Here you would typically save to a backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data if needed
    setIsEditing(false)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">Profile Information</Typography>
        {!isEditing ? (
          <Button startIcon={<Edit />} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button startIcon={<Save />} onClick={handleSave} variant="contained">
              Save
            </Button>
            <Button startIcon={<Cancel />} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar sx={{ width: 120, height: 120, mx: "auto", mb: 2, bgcolor: "#db2777", fontSize: "3rem" }}>
                S
              </Avatar>
              {isEditing && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                  size="small"
                >
                  <PhotoCamera />
                </IconButton>
              )}
            </Box>
            <Typography variant="h6">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customer since 2022
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={handleInputChange("firstName")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={handleInputChange("lastName")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange("email")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={handleInputChange("phone")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={profileData.address}
                  onChange={handleInputChange("address")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={profileData.city}
                  onChange={handleInputChange("city")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={profileData.state}
                  onChange={handleInputChange("state")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  value={profileData.zipCode}
                  onChange={handleInputChange("zipCode")}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={handleInputChange("birthday")}
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
