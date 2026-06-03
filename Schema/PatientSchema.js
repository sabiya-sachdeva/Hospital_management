import mongoose from "mongoose";
// import Patient from "./Patient";

const appSchema = new mongoose.Schema({
  patientfirstname: {
    type: String,
  },
  patientlastname: {
    type: String,
  },
  fullname: {
    type: String,
    // required: true,
  },
  patientemail: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  doctorname: {
    type: String,
  },

  status: {
    type: String,
    default: "Booked",
  },
  doctoremail: {
    type: String,
  },
});

export default mongoose.model("PatientSchema", appSchema);
