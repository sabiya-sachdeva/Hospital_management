import { Box, Toolbar, Typography, Card, CardContent } from "@mui/material";

import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <Toolbar />
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", p:3 }}
      >
        Admin Dashboard
      </Typography>
      <Box sx={{ display: "flex"}}>
        <Box sx={{ width: 450,p:2 }}>
          <Card
            component={Link}
            to="adddoctor"
            sx={{ mb: 2, textDecoration: "none", cursor: "pointer" }}
          >
            <CardContent>
              <Typography variant="h6">Add Doctors</Typography>
            </CardContent>
          </Card>
          <Card
            component={Link}
            to="managedoctor"
            sx={{ mb: 2, textDecoration: "none", cursor: "pointer" }}
          >
            <CardContent>
              <Typography variant="h6">Manage Doctors</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1,p:2 }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AdminDashboard;
