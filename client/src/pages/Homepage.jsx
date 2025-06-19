import { Box } from "@mui/material"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import FeaturedCakes from "../components/FeaturedCakes"
import AboutSection from "../components/AboutSection"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <FeaturedCakes />
        <AboutSection />
        <ContactSection />
      </Box>
      <Footer />
    </Box>
  )
}
