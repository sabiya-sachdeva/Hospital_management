import { Box, Typography, Toolbar, Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";

import Footerdetails from "../FooterDetails/Footerdetails";

export default function Overview() {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Spacer to prevent content hiding under AppBar */}
      <Toolbar />
      

      {/* Page Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Vision Section */}
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1" sx={{ mb: 6 }}>
          Vancouver's hospital vision is to{" "}
          <strong>Touch a billion Lives'</strong>. The Group also has
          Telemedicine facilities across several cities, Health Insurance
          Services, Global Projects Consultancy, Medical Colleges, Medvarsity
          for E-Learning, Colleges of Nursing and Hospital Management, and a
          Research Foundation. In addition, it provides an online consultation
          portal to help patients in case of an emergency. Recognizing that
          Non-Communicable Diseases (NCDs) are the greatest threat to the
          nation, Vancouver Hospitals is continuously educating people about
          preventive healthcare as the key to wellness.
        </Typography>

        {/* Mission Section */}
        <Typography variant="h4" gutterBottom >
          Our Mission
        </Typography>

        {/* Flex container for text and image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // column on mobile, row on desktop
            alignItems: "flex-start",
            gap: 3, // spacing between text and image
          }}
        >
          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              "Our mission is to bring healthcare of International standards
              within the reach of every individual. We are committed to the
              achievement and maintenance of excellence in education, research
              and healthcare for the benefit of humanity." Our hospital and
              community-based services are delivered by a team of 50K+ staff,
              medical staff, and volunteers dedicated to serving our patients,
              families, and communities.
            </Typography>
          </Box>

          {/* Image */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <img
              src="/Mission.png"
              alt="Mission"
              style={{ height: "300px", width: "310px" }}
            />
          </Box>
        </Box>
        <Typography variant="h4" gutterBottom>
          Key Clinical Milestones
        </Typography>
        {/*          
          { <Typography variant="body1">  */}

        <Box component="ul" sx={{ pl: 3, listStyleType: "disc" }}>
          <li>2,36,000+ Cardiac surgeries</li>
          <li>3,25,000 + Coronary angioplasties</li>
          <li>22000 + Cardiac robotic surgeries</li>

          <li>25,700 + Solid organ transplants</li>

          <li> 5,00,000 + Orthopedic surgeries</li>
          <li> 2,30,000 + Neurosurgeries</li>

          <li> 19,000 + Robotic surgeries over 22 clinical specialities</li>
        </Box>
      </Container>
      <Footerdetails />
    </>
  );
}
