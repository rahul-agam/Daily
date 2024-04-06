import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_CREDENTIALS)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

/*
This line, allows backend to accept request body through API call. 
I mean, we can put some data in request body
*/
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000!!!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
