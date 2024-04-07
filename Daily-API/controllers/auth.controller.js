import User from "../models/user.model.js";
// To encrypt the password, below library is used.
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

/*
using 'async' because, we need to wait for user signup.
*/
export const signup = async (req, res, next) => {
  console.log("We will help you to signup.. Please wait a minute.");
  console.log("Request Body : ", req.body);
  console.log("Next : ", next);

  // Reading request body data
  const { username, email, password } = req.body;

  // Validating the request body
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(
      errorHandler(
        400,
        "Please provide all the required fields like username, email, password"
      )
    );
  }

  // hashing the password using bcryptjs library
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    console.log("Trying to save the user details...");
    await newUser.save();
    console.log("Signup successfull");
    res.status(200).send("signup successful");
  } catch (error) {
    console.error("ERROR !! Could not save user details in Mongodb");
    next(error);
  }
};
