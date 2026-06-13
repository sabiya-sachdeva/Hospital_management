import React, { useState } from "react";

import { Box, TextField, Button, Typography} from "@mui/material";

function AddDoctors() {
  const [image, setImage] = useState(null);

  const [doctors, setdoctors] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlechange = (e) => {
    setdoctors({
      ...doctors,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", doctors.name);
      formData.append("specialty", doctors.specialty);
      formData.append("email", doctors.email);
      formData.append("phone", doctors.phone);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/adddoctor", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      alert(data.message);

      setdoctors({
        name: "",
        specialty: "",
        email: "",
        phone: "",
      });

      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
     

      <Box
        sx={{
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Add Doctor
        </Typography>

        <Box
          component="form"
          onSubmit={handlesubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Button variant="outlined" component="label">
            Upload Doctor Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {image && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={URL.createObjectURL(image)}
                alt="Doctor Preview"
                width="150"
                height="150"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <TextField
            label="Doctor Name"
            name="name"
            value={doctors.name}
            onChange={handlechange}
            required
          />

          <TextField
            label="Specialty"
            name="specialty"
            value={doctors.specialty}
            onChange={handlechange}
            required
          />

          <TextField
            label="Email"
            name="email"
            value={doctors.email}
            onChange={handlechange}
            required
          />

          <TextField
            label="Phone"
            name="phone"
            value={doctors.phone}
            onChange={handlechange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            Add Doctor
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctors;
