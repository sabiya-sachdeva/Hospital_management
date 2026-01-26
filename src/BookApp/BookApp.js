import React, { useContext, useState } from "react";
import { DoctorContext } from "../DoctorContext";
import Navbar from "../Navbar/Navbar";
import {
  Toolbar,
  Typography,
  Card,
  Box,
  CardMedia,
  Button,
} from "@mui/material";
import Footerdetails from "../FooterDetails/Footerdetails";

function Book() {
  const { selectedDoctor } = useContext(DoctorContext);
  const [appdata, setAppdata] = useState({
    fullname: "",
    date: "",
    time: "",
  });

  if (!selectedDoctor) {
    return <Typography sx={{ p: 4 }}>No doctor selected</Typography>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!appdata.date) || (!appdata.time)) {
      alert("Please select date and time");
      return;
    }
    const dataToSend = {
      ...appdata,
      fullname: selectedDoctor.name, // <-- set here
      
    };
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log("appointment booked");
        setAppdata({ date: "", time: "" });
        alert("Appointment booked Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setAppdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <Toolbar />

      <Typography variant="h4" sx={{ mb: 4, pt: 6, textAlign: "center" }}>
        Book Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={6}
          mb={5}
        >
          {/* Left: Doctor Image */}
          <Card sx={{ width: 220, marginleft: 150 }}>
            <CardMedia
              component="img"
              height="250"
              image={`${process.env.REACT_APP_PUBLIC_URL}${selectedDoctor.image}`}
              alt={selectedDoctor.name}
            />
          </Card>

          {/* Middle: Doctor Info */}
          <Box textAlign="center">
            <Typography variant="h5">{selectedDoctor.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Speciality: {selectedDoctor.specialty}
            </Typography>
          </Box>

          {/* Right: Date & Time */}
          <Box display="flex" flexDirection="column" gap={2} marginRight={40}>
            <Box>
              <Typography>Select Date</Typography>
              <input
                type="date"
                name="date"
                value={appdata.date}
                onChange={handlechange}
              />
            </Box>

            <Box>
              <Typography>Select Time</Typography>
              <input
                type="time"
                name="time"
                value={appdata.time}
                onChange={handlechange}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" mb={6}>
          <Button type="submit" variant="contained" color="primary">
            Book Appointment
          </Button>
        </Box>
      </form>
      <Footerdetails />
    </>
  );
}

export default Book;
