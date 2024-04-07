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
    console.error("Could Not Connect to MongoDB");
    console.error(err);
  });
const app = express();

/*
This line, allows backend to accept request body through API call. 
I mean, we can put some data in request body
*/
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

/*
  Middleware to handle errors
*/
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});
