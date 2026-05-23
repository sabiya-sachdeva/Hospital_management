import { Typography } from "antd";
import React, { useState, useEffect } from "react";

function Myappointment() {
  const [appointments, setAppointments] = useState([]);
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
      <Typography>My appointments</Typography>
      {appointments.map((app, index) => (
        <div key={index}>{app.doctorname}{app.time}{app.date}</div>
        
      ))}
    </div>
  );
}

export default Myappointment;
