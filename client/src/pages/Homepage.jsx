import { Box } from "@mui/material"
import Header from "../components/Header"
import HeroSection from "../components/HomePage/HeroSection"
import FeaturedCakes from "../components/HomePage/FeaturedCakes"
import AboutSection from "../components/HomePage/AboutSection"
import ContactSection from "../components/HomePage/ContactSection"
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
