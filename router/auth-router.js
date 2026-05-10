import doctors from "../Schema/Doctors.js";
import { Router } from "express";
import patientshema from "../Schema/Patient.js";
import diseases from "../Schema/Disease.js";
import medicalsupplies from "../Schema/Medicalsupplies.js";
import appSchema from "../Schema/PatientSchema.js";
import jwt from "jsonwebtoken";
import User from "../Schema/User.js";
const router = Router();

router.get("/doctors", (req, res) => {
  res.send(doctors);
});

router.get("/diseases", (req, res) => {
  res.send(diseases);
});
router.get("/medsupplies", (req, res) => {
  res.send(medicalsupplies);
});

router.get("/medsupplies/:id", (req, res) => {
  const id = req.params.id;
  const product = medicalsupplies.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  } else {
    return res.json(product);
  }
});

router.get("/diseases/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const disease = diseases.find((d) => d.id === id);

  if (disease) {
    res.json(disease);
  } else {
    return res.status(404).json({ message: "Disease not found" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password, cpassword } = req.body;
if(password!=cpassword){
  return res.status(400).json({
        message: "Passwords do not match",
      });
}
    const newUser = new User({
      firstname,
      lastname,
      email,
      password
     
    });

    await newUser.save();
    res.status(201).json({ message: "login Successfully" });
  } catch (error) {
    console.log("Signup error");
  }
});

router.post("/login",async(req,res)=>{
  try{
  const {email,password}=req.body;
  const founduser=await User.findOne({email});
  if(!founduser){
    return res.status(404).json({
      message:"User not found",
    })
  }
  if(founduser.password!=password){
    return res.status(401).json({
      message:"Invalid password"
    });
  }
  const token=jwt.sign({
    id:founduser._id,
    email:founduser.email,
  },
  "mysecretkey",
  {
    expiresIn:"1h",
  }
  );
  res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {

   

    res.status(500).json({
      message: "Login error",
    });
  }
});


router.post("/contact", async (req, res) => {
  try {
    const { Fullname, Contactno, Message } = req.body;
    const newrequest = new patientshema({
      Fullname,
      Contactno,
      Message,
    });
    console.log(Fullname, Contactno, Message);
    await newrequest.save();
    res.status(201).json({ message: "registered successfully" });
  } catch (error) {
    console.log("contact us", error);
  }
});

router.post("/appointment", async (req, res) => {
  try {
    const { fullname, date, time } = req.body;
    const newappointment = new appSchema({
      fullname,
      date,
      time,
    });
    await newappointment.save();
    res.status(201).json({ message: "appointment booked successfully" });
  } catch (error) {
    console.log("appointment booked error", error);
  }
});
export default router;
