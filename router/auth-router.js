import doctors from "../Schema/Doctors.js";
import { Router } from "express";
import patientshema from "../Schema/Patient.js";
import diseases from "../Schema/Disease.js";
import medicalsupplies from "../Schema/Medicalsupplies.js";
import appSchema from "../Schema/PatientSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Schema/User.js";
import transporter from "../utils/sendemail.js";
import PatientSchema from "../Schema/PatientSchema.js";
const router = Router();

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // containes payload of token

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

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
    const { firstname, lastname, email, password, cpassword, role } = req.body;

    // Check passwords
    if (password !== cpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "Sign Up Successfully",
    });
  } catch (error) {
    console.log("Signup error", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const founduser = await User.findOne({ email }).select("+password");

    if (!founduser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password.trim(), founduser.password);
    console.log("matching", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    //  jwt token generation
    const token = jwt.sign(
      {
        id: founduser._id,
        email: founduser.email,
        role: founduser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    console.log(token);
    return res.status(200).json({
      message: "Login successful",
      token,
      role: founduser.role,
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

router.get("/myappointments", verifyToken, async (req, res) => {
  try {
    const patient = await User.findById(req.user.id);

    const appointments = await PatientSchema.find({
      patientemail: patient.email,
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching appointments",
    });
  }
});
router.delete("/cancelappointments/:id", verifyToken, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await PatientSchema.findByIdAndUpdate(appointmentId, {
      status: "Cancelled",
    });
    res.status(200).json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/appointment", verifyToken, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patient = await User.findById(req.user.id);
    // console.log("patient", patient);
    //     console.log("doctorId:", doctorId);
    // console.log("doctorId type:", typeof doctorId);
    // console.log("doctors:", doctors);
    const doctor = doctors.find((doc) => doc.id === doctorId);
    const existingAppointment = await PatientSchema.findOne({
      doctorname: doctor.name, //comes from doctor object
      date, //comes from req.body
      time, //comes from req.body
    });
    if (existingAppointment) {
      return res.status(400).json({
        message: "the time slot is already booked",
      });
    }
    const newappointment = new appSchema({
      patientemail: patient.email,

      patientfirstname: patient.firstname,
      patientlastname: patient.lastname,
      doctorname: doctor.name,
      doctoremail: doctor.contact.email,
      date,
      time,
    });
    await newappointment.save();
    // console.log(process.env.EMAIL_USER);
    // console.log(process.env.EMAIL_PASS);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: patient.email,
      subject: "Appointment Confirmation",
      text: `
Hello 

Your appointment has been booked successfully.

Doctor: ${doctor.name}
Date: ${date}
Time: ${time}

Thank you.
      `,
    });
    res.status(201).json({ message: "appointment booked successfully" });
  } catch (error) {
    console.log("appointment booked error", error);
  }
});

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const patient = await User.findById(req.user.id); // when user login in check using middle it returns const token = jwt.sign({
    //   id: founduser._id,
    //   email: founduser.email
    // });   and check if login user is in USer schema

    const appointments = await PatientSchema.find({
      patientemail: patient.email,
    });
    const totalappointment = appointments.length;

    const cancelledAppointments = appointments.filter(
      (app) => app.status === "Cancelled",
    );
    const totalcancelledapp = cancelledAppointments.length;

    const upcomingAppointments = appointments.filter(
      (app) => app.status === "Booked",
    ).length;
    res.status(200).json({
      firstname: patient.firstname,
      totalappointment,
      totalcancelledapp,
      upcomingAppointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Dashboard error",
    });
  }
});
router.get("/appointmentstats", verifyToken, async (req, res) => {
  try {
    const patient = await User.findById(req.user.id);
    const appointments = await PatientSchema.find({
      patientemail: patient.email,
    });
    const montlyStats = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    appointments.forEach((app) => {
      // console.log(app.date);
      const month = new Date(app.date).toLocaleString("default", {
        month: "long",
      }); //convert string to date
      montlyStats[month] = montlyStats[month] + 1;
    });
    const chardata = Object.entries(montlyStats) // redchart expects an array of object not an object montly stats returns object
      .map(([month, count]) => ({
        month: month,
        appointments: count,
      }));
    res.json(chardata);
  } catch (error) {
    console.log(error);
  }
});
router.get("/doctordashboard", verifyToken, async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    const appointment = await PatientSchema.find({
      doctoremail: doctor.email,
    });
    // console.log(appointment)

    return res.status(200).json(appointment);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "Error fetching appointments",
    });
  }
});
router.put("/appointment/:id/complete", verifyToken, async (req, res) => {
  try {
    // console.log("params =", req.params);
    // console.log("id =", req.params.id);
    await PatientSchema.findByIdAndUpdate(req.params.id, {
      status: "Completed",
    });
    res.status(200).json({
      message: "Appointment completed",
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/appointment/:id/cancel", verifyToken, async (req, res) => {
  try {
    await PatientSchema.findByIdAndUpdate(req.params.id, {
      status: "Cancelled",
    });
    res.status(200).json({
      message:"Appointment cancelled"
    })
  } catch (e) {
    console.log(e);
  }
});
export default router;
