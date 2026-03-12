import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CardActions,
  CardMedia,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footerdetails from "../FooterDetails/Footerdetails";
function DiseaseandCondition() {
  const navigate = useNavigate();
  const handlereadmore = (id) => {
    navigate(`/diseases/${id}`);
  };
  const [cardData, setCardData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await fetch("/api/diseases");
        if (response.ok) {
          const data = await response.json();
          setCardData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDisease();
  }, []);

  const filteredDisease = cardData.filter((item) =>
    item.tittle.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Navbar />
      <Toolbar />
      <Typography variant="h2" align="center" sx={{ mt: 5 }}>
        Diseases And Condition
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        sx={{ mb: 5 }}
      >
        Detailed Insights into Causes, Risk Factors, Preventions, and Management
      </Typography>
      <Typography align="center" gutterBottom sx={{ mb: 5 }}>
        <input
          type="text"
          value={search}
          placeholder="Search for Disease"
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "300px", borderRadius: "6px" }}
        ></input>
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={7}
        mb={10}
      >
        {filteredDisease.length > 0 ? (
          filteredDisease.map((item) => (
            <Card
              key={item.id}
              sx={{ width: 390, backgroundColor: "lightblue" }}
            >
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt=""
              ></CardMedia>
              <CardContent>
                <Typography variant="h5">{item.tittle}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handlereadmore(item.id)}
                >
                  Read More{" "}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No Disease found.
          </Typography>
        )}
      </Box>

      <Footerdetails />
    </div>
  );
}

export default DiseaseandCondition;
