import { useState } from "react";
import Navbar from "../Navbar/Navbar";

import { Grid, TextField, Typography, Button, Toolbar } from "@mui/material";
import Footerdetails from "../FooterDetails/Footerdetails";
function ContactUs() {
  const [formData, setFormdata] = useState({
    Fullname: "",
    Contactno: "",
    Message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "/api/contact",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        console.log("data saved");
        alert("Message saved successfully");
        // console.log(Fullname,Contactno,Message)
        setFormdata({ Fullname: "", Contactno: "", Message: "" });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <Navbar />
      <Toolbar />
      <Typography variant="h3" align="center" sx={{ mb: 5, mt: 6 }}>
        Contact Us
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ alignItems: "center" }}
        >
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="Fullname"
              variant="outlined"
              value={formData.Fullname}
              onChange={handlechange}
              sx={{ width: 850 }}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contact number"
              name="Contactno"
              value={formData.Contactno}
              onChange={handlechange}
              type="number"
              required
              sx={{ width: 850 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="Message"
              value={formData.Message}
              onChange={handlechange}
              multiline
              rows={4}
              required
              sx={{ width: 850, mb: 2 }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: 150, mb: 5 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Footerdetails />
      {/* <Footer/> */}
    </div>
  );
}

export default ContactUs;
