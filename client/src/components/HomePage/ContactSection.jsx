import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  styled,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Instagram,
  Facebook,
  Twitter,
  Cake,
} from "@mui/icons-material";

const SectionWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #e0f2fe, #bae6fd)",
  padding: theme.spacing(15, 2),
  scrollMarginTop: "65px", // Reduced from 10 to 6
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Reduced from 4 to 3
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  backgroundColor: "#ffffff",
  width: "100%",
  maxWidth: 400,
}));

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4} // Reduced gap
          alignItems="flex-start"
        >
          {/* Left Content */}
          <Box flex={1}>
            <Paper
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.3,
                bgcolor: "#fde2e4",
                borderRadius: 2,
                mb: 1.5, // Reduced bottom margin
                boxShadow: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#000", fontWeight: 600, fontSize: "14px" }}
              >
                Get in Touch
              </Typography>
            </Paper>

            <Typography
              variant="h5" // Reduced from h4 to h5
              sx={{ fontWeight: "bold", mb: 1.5, color: "#be185d" }}
            >
              Order Your Dream Cake Today
            </Typography>

            <Typography
              variant="body2"
              paragraph
              sx={{
                color: "#6b7280",
                maxWidth: 500,
                mb: 2,
              }}
            >
              Planning a wedding, birthday, or event? We’ll create the perfect cake for you!
            </Typography>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Phone sx={{ color: "#db2777" }} />
                <Typography sx={{ color: "black", fontSize: 14 }}>
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Email sx={{ color: "#db2777" }} />
                <Typography sx={{ color: "black", fontSize: 14 }}>
                  info@shruti's Bakery.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn sx={{ color: "#db2777" }} />
                <Typography sx={{ color: "black", fontSize: 14 }}>
                  123 Bakery Street, Sweet City
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
              <IconButton sx={{ bgcolor: "#fce7f3", color: "#db2777" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ bgcolor: "#fce7f3", color: "#db2777" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ bgcolor: "#fce7f3", color: "#db2777" }}>
                <Twitter />
              </IconButton>
            </Box>
          </Box>

          {/* Right Form */}
          <Box flexShrink={0} sx={{ ml: { md: 4 } }}>
            <ContactCard>
              <Box component="form" noValidate>
          
                    <TextField
                      required
                      fullWidth
                      id="full-name"
                      label="Full Name"
                      name="full-name"
                      placeholder="Enter your name"
                      sx={{mb:2}}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1}}>
                            <Typography sx={{ fontSize: 20, color: "#db2777" }}>
                              👤
                            </Typography>
                          </Box>
                        ),
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      id="contact-number"
                      label="Contact Number"
                      name="contact-number"
                      type="tel"
                      placeholder="+91 9876543210"
                      sx={{mb:2}}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1}}>
                            <Phone sx={{ color: "#db2777" }} />
                          </Box>
                        ),
                      }}
                    />

                  {/* Second Row */}
                    <TextField
                      required
                      fullWidth
                      id="cake-requirements"
                      label="Cake Requirements"
                      name="cake-requirements"
                      placeholder="Flavor, size, theme, etc."
                      sx={{mb:2}}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1}}>
                            <Cake sx={{ color: "#db2777" }} />
                          </Box>
                        ),
                      }}
                    />

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: "#db2777",
                    fontWeight: 600,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "1rem",
                    py: 1.3,
                    "&:hover": {
                      bgcolor: "#be185d",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </ContactCard>
          </Box>
        </Box>
      </Container>
    </SectionWrapper>
  );
}
