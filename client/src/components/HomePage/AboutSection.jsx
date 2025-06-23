import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  background: "linear-gradient(to right, #fef9c3, #fde68a)",
  position: "relative",
  //overflow: "hidden",
  textAlign: "center", // Center all text by default
  scrollMarginTop: '62px'
}));

const GradientBlob = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "-100px",
  left: "-100px",
  width: "300px",
  height: "300px",
  background: "radial-gradient(circle at center, #f9a8d4, #f472b6)",
  borderRadius: "50%",
  filter: "blur(100px)",
  opacity: 0.4,
  zIndex: 0,
}));

export default function AboutSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SectionWrapper id="about">
      <GradientBlob />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mx: "auto", // Center the box
              }}
            >
              <Paper
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  bgcolor: "#fce7f3",
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "#db2777", fontWeight: 600,fontSize:"15px" }}>
                  Our Story
                </Typography>
              </Paper>

              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "1px",
                }}
              >
                Baking with Passion Since 2010
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: "#4b5563",
                  fontSize: "1.1rem",
                  maxWidth: "800px",
                  mx: "auto",
                }}
              >
                Sweet Delights began as a small family bakery with a simple mission: to craft delightful, handcrafted
                cakes that bring joy to every moment. Blending time-honored traditions with bold flavors, we’ve grown
                into a symbol of love, sweetness, and celebration.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: "#4b5563",
                  fontSize: "1.1rem",
                  maxWidth: "800px",
                  mx: "auto",
                }}
              >
                Each dessert is made from scratch with passion and premium ingredients. From birthdays to weddings, we
                put heart into every bite.
              </Typography>

              <Link to="/about" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    backgroundColor: "#db2777",
                    px: 4,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#be185d",
                    },
                  }}
                >
                  Learn More About Us
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionWrapper>
  );
}
