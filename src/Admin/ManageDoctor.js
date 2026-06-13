import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CardMedia,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";

function ManageDoctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchdoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchdoctors();
  }, []);
  const deleteDoctor = async (id) => {
    const response = await fetch(`/api/deletedoctor/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    setDoctors(doctors.filter((doctors) => doctors._id !== id));
  };
  return (
    <div>
      <Box>
        <Typography variant="h4">List of all doctors</Typography>
        {doctors.map((doctor) => (
          <Card key={doctor._id} sx={{ p: 5 }}>
            <CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                image={`http://127.0.0.1:5000/uploads/${doctor.image}`}
              ></CardMedia>
              <Typography variant="h6">Doctor Name:{doctor.name}</Typography>
              <Typography variant="h6">
                Doctor Speciality:{doctor.specialty}
              </Typography>
              <Typography variant="h6">Doctor Email:{doctor.email}</Typography>
            </CardContent>
            <Button
              onClick={() => deleteDoctor(doctor._id)}
              variant="contained"
              sx={{ mr: 5 }}
            >
              Delete
            </Button>
            <Button variant="contained">Edit</Button>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default ManageDoctor;
