
import dotenv from "dotenv"
dotenv.config(); 
import express from "express";



import router from "./router/auth-router.js";
import connectDb from "./Database/Db.js";
const app = express();
// import cors from "cors";
const PORT = process.env.PORT || 5000;



// app.use(cors());



//  const PORT = 3001;
app.use(express.json());
app.use("/api", router);

app.use(express.static("public"));

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server has started and is listening on port number:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
//Server is running
