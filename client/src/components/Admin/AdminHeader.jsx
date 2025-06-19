import React from "react"
import {Link} from "react-router-dom"
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Menu, MenuItem, Avatar, Divider } from "@mui/material"
import { Notifications, AccountCircle, ExitToApp, Dashboard, Home } from "@mui/icons-material"

export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [notificationAnchor, setNotificationAnchor] = React.useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setNotificationAnchor(null)
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#db2777" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Sweet Delights Logo"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="h6" component="span" sx={{ fontWeight: "bold", color: "white" }}>
            Shruti's Bakery Admin
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link href="/" passHref>
            <IconButton color="inherit" title="View Website">
              <Home />
            </IconButton>
          </Link>

          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(255,255,255,0.2)" }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Dashboard sx={{ mr: 1 }} /> Dashboard
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ExitToApp sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu anchorEl={notificationAnchor} open={Boolean(notificationAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">New order from Sarah Johnson</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Low stock alert: Chocolate Cake</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Customer review pending</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Payment received: $89.99</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
