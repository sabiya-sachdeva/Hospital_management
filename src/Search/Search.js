import React, { useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../DoctorContext";
import Navbar from "../Navbar/Navbar";
import {
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import Footerdetails from "../FooterDetails/Footerdetails";

function Search() {
  var [Doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { setSelectedDoctor } = useContext(DoctorContext);
  const getDoctors = async () => {
    try {
      const response = await axios.get("/api/doctors");
      console.log(response);
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredDoctors = useMemo(() => {
    return Doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [Doctors, search]);

  const handleBook = (doctor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to book an appointment");
      navigate("/login");
      return;
    }

    setSelectedDoctor(doctor);

    navigate(`/book/${doctor.id}`);
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div>
      <Navbar />
      <Toolbar />
      <Typography variant="h3" sx={{ mt: 6, textAlign: "center", mb: 5 }}>
        Doctors
      </Typography>

      <Box display="flex" justifyContent="center" mb={5}>
        <TextField
          label="Search Doctor by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={5}
        mb={5}
      >
        {filteredDoctors.map((Doctor, index) => (
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={Doctor.image}
              alt={Doctor.name}
            ></CardMedia>

            <br />
            <CardContent>
              <Typography>{Doctor.name}</Typography>
              <Typography>{Doctor.specialty}</Typography>
              <Typography>{Doctor.contact.email}</Typography>
            </CardContent>

            <Button
              sx={{ display: "block", mx: "auto", mb: 2 }}
              variant="contained"
              onClick={() => {
                handleBook(Doctor);
              }}
            >
              Book Appointment
            </Button>
          </Card>
        ))}
      </Box>
      <Footerdetails />
    </div>
  );
}

export default Search;
