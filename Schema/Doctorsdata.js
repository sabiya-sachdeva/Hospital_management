import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String },
  specialty: { type: String },
  email: { type: String },
  phone: { type: String },
  image: { type: String },
});

export default mongoose.model("Doctordata", doctorSchema);
