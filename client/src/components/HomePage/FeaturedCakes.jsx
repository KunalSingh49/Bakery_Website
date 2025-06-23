import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import cake1 from "../../assets/cake1.png";
import cake2 from "../../assets/cake2.png";
import cake3 from "../../assets/cake3.png";

const PinkSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #fff1f2, #fbcfe8)",
  padding: theme.spacing(10, 0),
  scrollMarginTop: "62px",
}));

export default function FeaturedCakes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const featuredCakes = [
    {
      id: 1,
      name: "Strawberry Bliss",
      description: "Fresh strawberries layered with cream and soft sponge.",
      price: "$29.99",
      image: cake1,
    },
    {
      id: 2,
      name: "Chocolate Heaven",
      description: "Rich chocolate cake with fudge frosting and dark ganache.",
      price: "$34.99",
      image: cake2,
    },
    {
      id: 3,
      name: "Vanilla Dream",
      description: "Classic vanilla cake topped with buttercream & sprinkles.",
      price: "$27.99",
      image: cake3,
    },
  ];

  return (
    <PinkSection id="menu">
      <Container>
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Paper
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              bgcolor: "#fce7f3",
              borderRadius: 2,
              mb: 1,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#db2777", fontWeight: 600,fontSize:"15px" }}
            >
              Taste the Magic
            </Typography>
          </Paper>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#be185d",
              mb: 2,
              letterSpacing: "1px",
            }}
          >
            Featured Cakes
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Indulge in our top picks, carefully crafted to sweeten every
            celebration.
          </Typography>
        </Box>

        {/* Horizontal Scrollable Cards */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "center", // center on desktop
            flexWrap: isMobile ? "nowrap" : "wrap",
            overflowX: isMobile ? "auto" : "visible",
            gap: 4,
            px: 2,
            pb: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {featuredCakes.map((cake) => (
            <Card
              key={cake.id}
              sx={{
                width: 350,
                flex: "0 0 auto",
                borderRadius: "20px",
                boxShadow: 4,
                transition: "0.3s",
                backgroundColor: "#fff",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 220,
                  overflow: "hidden",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  pt: 6, // Padding top added to separate image from card top
                }}
              >
                <CardMedia
                  component="img"
                  image={cake.image}
                  alt={cake.name}
                  sx={{
                    width: "80%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius:"10px"
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {cake.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minHeight: 50, mb: 2 }}
                >
                  {cake.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#db2777", fontWeight: 700, mb: 2 }}
                >
                  {cake.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#db2777",
                    "&:hover": { backgroundColor: "#be185d" },
                    textTransform: "none",
                    px: 4,
                    borderRadius: "25px",
                  }}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View Full Menu Button */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#db2777",
                color: "#db2777",
                borderRadius: "25px",
                px: 4,
                "&:hover": {
                  color: "#fff",
                  bgcolor:"#db2777",
                  borderColor: "#db2777"
                },
              }}
            >
              View Full Menu
            </Button>
          </Link>
        </Box>
      </Container>
    </PinkSection>
  );
}
