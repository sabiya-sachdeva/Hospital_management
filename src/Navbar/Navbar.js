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
import { Link,useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";

export default function Navbar() {
  const [discoverAnchor, setDiscoverAnchor] = useState(null);
  const [medicalAnchor, setMedicalAnchor] = useState(null);
  const [libraryAnchor, setLibraryAnchor] = useState(null);
 const navigate = useNavigate();
  const openMenu = (setter) => (event) => setter(event.currentTarget);
  const closeMenu = (setter) => () => setter(null);

   const handleLogout=()=>{
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/Login");
   }
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ mr: 30 }}>
          <img src="/hospitallogo.png" alt="logo" width="90" />
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
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
            PaperProps={{
              sx: {
                width: discoverAnchor?.offsetWidth,
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/overview"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Overview
            </MenuItem>
            <MenuItem
              component={Link}
              to="/careers"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Careers
            </MenuItem>
            {/* <MenuItem
              component={Link}
              to="/medsupplies"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Vision & Mission
            </MenuItem> */}
            <MenuItem
              component={Link}
              to="/contact"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Contact Us
            </MenuItem>
          </Menu>

          {/* Medical Services Dropdown */}
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
            PaperProps={{
              sx: {
                width: discoverAnchor?.offsetWidth,
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/medsupplies"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Medical Supplies
            </MenuItem>
            <MenuItem
              component={Link}
              to="/center-of-excellence"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Center of Excellence & Specialists
            </MenuItem>
            <MenuItem
              component={Link}
              to="/surgery"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Surgery
            </MenuItem>
            <MenuItem
              component={Link}
              to="/radiology"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Radiology
            </MenuItem>
          </Menu>

          {/* Health Library Dropdown */}
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
            PaperProps={{
              sx: {
                width: discoverAnchor?.offsetWidth,
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/diseases"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Diseases & Conditions
            </MenuItem>
            <MenuItem
              component={Link}
              to="/treatments"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Treatments & Procedures
            </MenuItem>
            <MenuItem
              component={Link}
              to="/symptoms"
              sx={{
                "&:hover": {
                  backgroundColor: "bisque",
                },
              }}
            >
              Symptoms Guide
            </MenuItem>
          </Menu>
        </Box>

        {/* Spacer */}
          {!Token?(
        
        <Box component={Link} to="/Login" sx={{ mr: 5, color:"white", fontWeight:"bold" ,textDecoration:"none"}}>
        Login
          {/* <img src="login.png" alt="login" width={30} /> */}
        </Box>):(<Button
            color="inherit"
            sx={{ mr: 5, fontWeight: "bold" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
        {/* <Box component={Link} to="/Logout" sx={{fontWeight:"bold",color:"white",mr:5,textDecoration:"none"}}>
          Logout
        </Box> */}

        {/* Search Icon */}
        <IconButton color="inherit" component={Link} to="/search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
