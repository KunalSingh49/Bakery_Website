import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import Featured from "../../assets/Featured.png";

const HeroWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(10, 0),
  background:
    "linear-gradient(to right, rgba(253, 242, 248, 0.8), rgba(252, 231, 243, 0.8))",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(14, 0),
  },
}));

export default function HeroSection() {
  return (
    <HeroWrapper id="hero">
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                maxWidth: 600,
                mx: { xs: "auto", lg: 0 },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "3.75rem",
                  },
                }}
              >
                Delicious{" "}
                <Box component="span" sx={{ color: "#db2777" }}>
                  Handcrafted
                </Box>{" "}
                Cakes for Every Occasion
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: "text.secondary",
                  fontSize: { md: "1.25rem" },
                }}
              >
                Indulge in our artisanal cakes made with love and the finest
                ingredients. Perfect for birthdays, weddings, or just because.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mt: 3,
                  justifyContent: { xs: "center", lg: "flex-start" },
                }}
              >
                <Link to="#menu" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ChevronRight />}
                    sx={{
                      bgcolor: "#db2777",
                      "&:hover": { bgcolor: "#be185d" },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    View Our Menu
                  </Button>
                </Link>
                <Link to="#contact" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ px: 4, py: 1.5,fontWeight: 600,borderColor: "#db2777",
                    color: "#db2777",
                    "&:hover": {
                      bgcolor: "#db2777",
                      color: "#fff",
                      borderColor: "#db2777",
                    },}}
                  >
                    Order Now
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, sm: 400, md: 500 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              <img
                src={Featured}
                alt="Featured Cake"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
}
