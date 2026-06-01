import { Toolbar, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footerdetails from "../FooterDetails/Footerdetails.js";

function PatientDashboard() {
  const [dashboard, setDashboard] = useState({
    firstname: "",
    totalappointment: 0,
    totalcancelledapp: 0,
    upcomingAppointments: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard", err);
      });
  }, []);

  return (
    <div>
      <Navbar isLoggedInPage={true} />
      <Toolbar />
      <Box textAlign="center">
        <Typography sx={{ fontSize: 24, marginTop: 10 ,marginBottom: 5}}>
          Welcome {dashboard.firstname}
          <br />
          Total Appointments:{dashboard.totalappointment}
          <br />
          Cancelled Appointments: {dashboard.totalcancelledapp}
        </Typography>
      </Box>
      <Footerdetails />
    </div>
  );
}

export default PatientDashboard;
