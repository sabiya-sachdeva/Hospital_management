import mongoose from "mongoose";
// import Patient from "./Patient";

const appSchema = new mongoose.Schema({
  fullname: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    required: true,
  },
  patientemail: {
    type: String,
  },
  patientfirstname: {
    type: String,
  },
  patientlastname: {
    type: String,
  },
  doctorname: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Booked",
  },
});

export default mongoose.model("PatientSchema", appSchema);
