import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default mongoose.model("PatientSchema", appSchema);
