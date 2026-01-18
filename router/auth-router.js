import doctors from "../Schema/Doctors.js";
import { Router } from "express";
import patientshema from "../Schema/Patient.js";
import diseases from "../Schema/Disease.js";
import medicalsupplies from "../Schema/Medicalsupplies.js";
import appSchema from "../Schema/PatientSchema.js";
const router = Router();

// router.get("/", (req, res) => {
//   res.send("welcome");
// });

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
