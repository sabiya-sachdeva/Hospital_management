import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },});
  transporter.verify((error, success) => {
  if (error) {
    console.log("VERIFY ERROR:", error);
  } else {
    console.log("Email server is ready");
  }
});



export default transporter;
