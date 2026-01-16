import {
  Box,
 
  Typography,
  Card,
  Button,
  CardActions,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footerdetails from "../FooterDetails/Footerdetails";
import Navbar from "../Navbar/Navbar";

function DiseaseDetail() {
  const { id } = useParams();
  console.log("id", id);
  const [disease, setdisease] = useState(null);
  const navigate = useNavigate();
  const handleapp = () => {
    navigate("/book");
  };

  const contact = () => {
    navigate("/contact");
  };


  useEffect(() => {
    const fetchDiseaseDetail = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/api/diseases/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setdisease(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiseaseDetail();
  }, [id]);

  return (
    <div>
      <Navbar/>
      <Toolbar/>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ backgroundColor: "#757ce8", padding: "20px" ,mt:2}}
      >
        {disease?.tittle}
      </Typography>
      <Box sx={{ display: "flex", gap: 2,paddingLeft:5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" gutterBottom sx={{ margin: "20px" }}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={{ margin: "20px" }}>
            {disease?.Introduction}
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ margin: "20px" }}>
            Causes and Risk Factors
          </Typography>
          <Typography variant="body1" sx={{ margin: "20px" }}>
            {disease?.Risk}
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ margin: "20px" }}>
            Symptoms
          </Typography>
          <Typography variant="body1" sx={{ margin: "20px" }}>
            {disease?.Symptom}
          </Typography>

          <Typography variant="h3" gutterBottom sx={{ margin: "20px" }}>
            Prevention
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ margin: "20px" }}>
            {disease?.Prevention}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => {
                  handleapp();
                }}
              >
                Book Appointment
              </Button>
            </CardActions>
            <CardActions>
              
              <Button variant="contained" 
              onClick={() => {
                  contact();
                }}
              >Contact Us</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Footerdetails/>
    </div>
  );
}

export default DiseaseDetail;
