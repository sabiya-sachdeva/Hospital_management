import { TextField, Box, Button, Paper, Typography } from "@mui/material";

import React, { useState,useRef,useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const emailRef=useRef(null);
  const [formdata, setformData] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json(); //recieve jwt token from backend
      if (response.ok) {
        console.log(data);

        // save token
        localStorage.setItem("token", data.token);

        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  emailRef.current.focus();
},[])
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
          justifyContent: "center", // horizontal center
          alignItems: "center", // vertical center
          gap: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: 450,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
          >
            Login in or create an account
          </Typography>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formdata.email}
            onChange={handlechange}
            inputRef={emailRef}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formdata.password}
            onChange={handlechange}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>

          <Link to="/Signup" sx={{ mr: 5 }}>
            New User? SignUp
          </Link>
        </Paper>
      </Box>
    </div>
  );
}

export default Login;
