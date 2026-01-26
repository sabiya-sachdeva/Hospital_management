import { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  
} from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Footerdetails from "./FooterDetails/Footerdetails";

const MedicalSupplies = () => {
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch("/api/medsupplies");
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        }
      } catch (error) {
        console.log("error");
      }
    };
    data();
  }, []);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {item.map((i) => (
          <Card
            key={i.id}
            sx={{
              backgroundColor: "lightblue",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={i.image}
              alt={i.name}
               onClick={() => navigate(`/add-to-bag/${i.id}`)}
            />

            <CardContent>
              <Typography variant="h5">{i.name}</Typography>
              <Typography variant="body 1">{i.price}</Typography>
            </CardContent>

            {/* <Button
              variant="contained"
              sx={{ display: "block", mx: "auto", mb: 2 }}
              onClick={() => navigate(`/add-to-bag/${i.id}`)}
            >
              Add to bag
            </Button> */}
          </Card>
        ))}
      </Box>
      <Footerdetails />
    </>
  );
};

export default MedicalSupplies;
