import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
  },
  Contactno: {
    type: Number,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Patient", patientSchema);
