import { Toolbar, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footerdetails from "../FooterDetails/Footerdetails.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function PatientDashboard() {
  const [dashboard, setDashboard] = useState({
    firstname: "",
    totalappointment: 0,
    totalcancelledapp: 0,
    upcomingAppointments: 0,
  });

  const [charData, setCharData] = useState([]);

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/appointmentstats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCharData(data);
      });
  }, []);

  return (
    <div>
      <Navbar isLoggedInPage={true} />
      <Toolbar />
      <Box textAlign="center">
        <Typography sx={{ fontSize: 24, marginTop: 10, marginBottom: 10 }}>
          Welcome {dashboard.firstname}
          <br />
          Total Appointments:{dashboard.totalappointment}
          <br />
          Upcoming Appointments:{dashboard.upcomingAppointments} <br />
          Cancelled Appointments: {dashboard.totalcancelledapp}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Visual representation of appointmens booked per month
      </Typography>
      <Box display="flex" justifyContent="center" mt={5} mb={10}>
        <BarChart width={1000} height={500} data={charData}   fill="#2563eb">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            label={{
              value: "Number of Appointments",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Bar dataKey="appointments" name="Appointments" label />
        </BarChart>
      </Box>
      <Footerdetails />
    </div>
  );
}

export default PatientDashboard;
