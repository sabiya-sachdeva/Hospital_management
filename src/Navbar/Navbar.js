import { useState } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedInPage }) {
  const [discoverAnchor, setDiscoverAnchor] = useState(null);
  const [medicalAnchor, setMedicalAnchor] = useState(null);
  const [libraryAnchor, setLibraryAnchor] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const openMenu = (setter) => (event) => setter(event.currentTarget);

  const closeMenu = (setter) => () => setter(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/Login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ mr: 30 }}>
          <img src="/hospitallogo.png" alt="logo" width="90" />
        </Box>

        {/* Center Menus */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoggedInPage ? (
            <>
              {/* Discover Dropdown */}
              <Button
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "blue",
                  },
                }}
                onClick={openMenu(setDiscoverAnchor)}
                endIcon={<ArrowDropDownOutlinedIcon />}
              >
                Discover Vancouver Hospital
              </Button>

              <Menu
                anchorEl={discoverAnchor}
                open={Boolean(discoverAnchor)}
                onClose={closeMenu(setDiscoverAnchor)}
              >
                <MenuItem component={Link} to="/overview">
                  Overview
                </MenuItem>

                <MenuItem component={Link} to="/careers">
                  Careers
                </MenuItem>

                <MenuItem component={Link} to="/contact">
                  Contact Us
                </MenuItem>
              </Menu>

              {/* Medical Services */}
              <Button
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "blue",
                  },
                }}
                onClick={openMenu(setMedicalAnchor)}
                endIcon={<ArrowDropDownOutlinedIcon />}
              >
                Medical Services
              </Button>

              <Menu
                anchorEl={medicalAnchor}
                open={Boolean(medicalAnchor)}
                onClose={closeMenu(setMedicalAnchor)}
              >
                <MenuItem component={Link} to="/medsupplies">
                  Medical Supplies
                </MenuItem>

                <MenuItem component={Link} to="/center-of-excellence">
                  Center of Excellence & Specialists
                </MenuItem>

                <MenuItem component={Link} to="/surgery">
                  Surgery
                </MenuItem>

                <MenuItem component={Link} to="/radiology">
                  Radiology
                </MenuItem>
              </Menu>

              {/* Health Library */}
              <Button
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "blue",
                  },
                }}
                onClick={openMenu(setLibraryAnchor)}
                endIcon={<ArrowDropDownOutlinedIcon />}
              >
                Health Library
              </Button>

              <Menu
                anchorEl={libraryAnchor}
                open={Boolean(libraryAnchor)}
                onClose={closeMenu(setLibraryAnchor)}
              >
                <MenuItem component={Link} to="/diseases">
                  Diseases & Conditions
                </MenuItem>

                <MenuItem component={Link} to="/treatments">
                  Treatments & Procedures
                </MenuItem>

                <MenuItem component={Link} to="/symptoms">
                  Symptoms Guide
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Logged In Menus */}

              <Box
                component={Link}
                to="/search"
                sx={{
                  color: "white",
                  mr: 5,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Doctors
              </Box>

              <Box
                component={Link}
                to="/medsupplies"
                sx={{
                  color: "white",
                  mr: 5,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Medical Supplies
              </Box>

              <Box
                component={Link}
                to="/myappointments"
                sx={{
                  color: "white",
                  mr: 5,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                My Appointments
              </Box>
            </>
          )}
        </Box>

        {/* Login / Logout */}
        {!token ? (
          <Box
            component={Link}
            to="/Login"
            sx={{
              mr: 5,
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Box>
        ) : (
          <Button
            color="inherit"
            sx={{ mr: 5, fontWeight: "bold" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}

        {/* Search */}
        <IconButton color="inherit" component={Link} to="/search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}