import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const cake = location.state;

  if (!state) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">No cake selected!</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const { name, image, price } = state;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fff1f2, #ffe4e6, #fdf2f8)",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(219, 39, 119, 0.2)",
            p: 3,
            textAlign: "center",
            background: "#fff",
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt={name}
            sx={{ borderRadius: 2, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight={700} color="#db2777">
              {name}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={2}>
              ₹ {price}
            </Typography>

            <TextField
              label="Delivery Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Delivery Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Delivery Address"
              placeholder="Enter full address"
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Extra Requirements"
              placeholder="Any message, design or topping preferences..."
              multiline
              rows={2}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#db2777",
                fontWeight: 600,
                borderRadius: 3,
                py: 1.2,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#be185d" },
              }}
            >
              Confirm Order
            </Button>

            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{ mt: 2, textTransform: "none", color: "#64748b" }}
            >
              ← Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
