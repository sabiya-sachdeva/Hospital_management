import { TextField, Box, Button, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

function SignUp() {
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handlechange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (response.ok) {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      } else {
        console.log("Signup failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Navbar />

      <Box
        component="form"
        onSubmit={handleclick}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 6,
            width: 450,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
          >
            Create an account
          </Typography>
          <TextField
            label="First Name"
            name="firstname"
            type="text"
            value={formdata.firstname}
            onChange={handlechange}
          ></TextField>
          <TextField
            label="Last Name"
            name="lastname"
            type="text"
            value={formdata.lastname}
            onChange={handlechange}
          ></TextField>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
          ></TextField>
          <TextField
            label="confirm Password"
            type="password"
            name="cpassword"
            value={formdata.cpassword}
            onChange={handlechange}
          ></TextField>
          <Button type="submit" variant="contained">
            SignUp
          </Button>
        </Paper>
      </Box>
    </div>
  );
}

export default SignUp;
