import express from "express";

import router from "./router/auth-router.js";
import connectDb from "./Database/Db.js";
import cors from "cors";
const app = express();

app.use(cors());
const port = 3001;
app.use(express.json());
app.use("/api", router);

app.use(express.static("public"));

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`server has started and is listening on port number:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
//Server is running
