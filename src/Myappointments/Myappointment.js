import { Typography, Box,Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

function Myappointment() {
  const [appointments, setAppointments] = useState([]);
  const handleClick=async(id)=>
  {
     const token=localStorage.getItem("token");
    const response=await fetch(`/api/cancelappointments/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    const data=await response.json();
    alert(data.message)
    setAppointments(appointments.filter((app)=>app._id!==id))
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/myappointments", {
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
  return (
    <div>
      <Navbar isLoggedInPage />
      <div style={{ marginTop: "100px" }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          My Appointments
        </Typography>
        {appointments.map((app, index) => (
          <Box key={index} sx={{ mt: 2 ,textAlign:"center"}}>
            <Typography><strong>Doctor Name:  </strong>{app.doctorname}</Typography>
            <Typography><strong>Appointment Date:  </strong>{app.date}</Typography>
            <Typography><strong>Appointment Time:  </strong>{app.time}</Typography>
            <Button type="submit" variant="contained" onClick={()=>handleClick(app._id)} sx={{ mr: 2 }}>Cancel</Button> 
            <Button type="submit" variant="contained" >Reshedule</Button>
            <hr/>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Myappointment;
