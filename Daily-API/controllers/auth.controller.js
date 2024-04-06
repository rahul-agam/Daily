import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

/*
using 'async' because, we need to wait for user signup.
*/
export const signup = async (req, res) => {
  console.log("In signup body ", req.body);

  // Reading request body data
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.send("signup successful");
  } catch (error) {
    res.send(error);
  }
};
