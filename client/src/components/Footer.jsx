import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  IconButton,
  styled,
  Tooltip,
  Button,
  Fade,
} from "@mui/material";
import {
  Instagram,
  Facebook,
  Twitter,
  KeyboardArrowUp,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

// Main footer background
const StyledFooter = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #0f172a, #1e293b)", // Bluish-black gradient
  color: "#f1f5f9",
  position: "relative",
}));

// Section padding
const FooterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

// Bottom copyright & social
const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: `1px solid rgba(255,255,255,0.1)`,
  padding: theme.spacing(3, 0),
}));

// Back to top button
const BackToTopButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  bottom: 24,
  right: 24,
  minWidth: "auto",
  padding: 10,
  borderRadius: "50%",
  backgroundColor: "#fce7f3",
  color: "#db2777",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "#db2777",
    color: "#fff",
  },
}));

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledFooter>
      <FooterSection>
        <Container>
          <Grid container spacing={4}>
            {/* Left side logo and tagline */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <img
                  src={logo}
                  alt="Shruti's Bakery Logo"
                  width={42}
                  height={42}
                  style={{ borderRadius: "50%" }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f472b6" }}>
                  Shruti's Bakery
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#cbd5e1", lineHeight: 1.6 }}>
                Handcrafted cakes made with love for every occasion since 2010. From birthdays to weddings – we bake joy.
              </Typography>
            </Grid>

            {/* Right side sections */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {[
                  { title: "Shop", links: ["Cakes", "Cupcakes", "Custom Orders"] },
                  { title: "Company", links: ["About", "Careers", "Contact"] },
                  { title: "Legal", links: ["Terms", "Privacy", "Cookies"] },
                ].map((section) => (
                  <Grid item xs={6} sm={4} key={section.title}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      {section.title}
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                      {section.links.map((link) => (
                        <Box component="li" key={link} sx={{ mb: 0.5 }}>
                          <RouterLink to="#" style={{ textDecoration: "none" }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#cbd5e1",
                                "&:hover": {
                                  color: "#f472b6",
                                  transition: "0.2s ease-in-out",
                                },
                              }}
                            >
                              {link}
                            </Typography>
                          </RouterLink>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </FooterSection>

      {/* Bottom section */}
      <FooterBottom>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                © 2025 Shruti's Bakery. All rights reserved.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                mt: { xs: 2, md: 0 },
                gap: 2,
              }}
            >
              <Tooltip title="Instagram">
                <IconButton size="small" sx={{ color: "#f472b6" }}>
                  <Instagram />
                </IconButton>
              </Tooltip>
              <Tooltip title="Facebook">
                <IconButton size="small" sx={{ color: "#f472b6" }}>
                  <Facebook />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton size="small" sx={{ color: "#f472b6" }}>
                  <Twitter />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Container>
      </FooterBottom>

      {/* Back to Top Button */}
      <Fade in={showButton}>
        <BackToTopButton onClick={scrollToTop} aria-label="Back to Top">
          <KeyboardArrowUp />
        </BackToTopButton>
      </Fade>
    </StyledFooter>
  );
}
