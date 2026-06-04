import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/doctordashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const completeapp = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/appointment/${id}/complete`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    alert(data.message);
  };
  const Cancelapp = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/appointment/${id}/cancel`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    alert(data.message);
  };
  const totalAppointments = appointments.length;

  const bookedAppointments = appointments.filter(
    (app) => app.status === "Booked",
  ).length;

  const cancelledAppointments = appointments.filter(
    (app) => app.status === "Cancelled",
  ).length;

  const completedAppointments = appointments.filter(
    (app) => app.status === "Completed",
  ).length;

  return (
    <div>
      <Navbar isLoggedInPage />

      <Box sx={{ mt: 12 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Doctor Dashboard
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          gap={3}
          flexWrap="wrap"
          mb={4}
        >
          <Card sx={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">Total</Typography>

              <Typography variant="h4">{totalAppointments}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">Booked</Typography>

              <Typography variant="h4">{bookedAppointments}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">Cancelled</Typography>

              <Typography variant="h4">{cancelledAppointments}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">Completed</Typography>

              <Typography variant="h4">{completedAppointments}</Typography>
            </CardContent>
          </Card>
        </Box>
        {appointments.map((app) => (
          <Card
            key={app._id}
            sx={{
              maxWidth: 700,
              margin: "20px auto",
            }}
          >
            <Typography variant="h4" sx={{ mt: 5,textAlign:"center" }}>Patients Listing</Typography>
            <CardContent>
              <Typography sx={{ mt: 2 }}>
                <strong>Patient Name:</strong> {app.patientfirstname}
                {app.patientlastname}
              </Typography>

              <Typography>
                <strong>Date:</strong> {app.date}
              </Typography>

              <Typography>
                <strong>Time:</strong> {app.time}
              </Typography>

              <Typography>
                <strong>Status:</strong> {app.status}
              </Typography>
              <Button
                variant="contained"
                sx={{ mr: 5, mt: 5 }}
                onClick={() => {
                  completeapp(app._id);
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 5 }}
                onClick={() => {
                  Cancelapp(app._id);
                }}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default DoctorDashboard;
