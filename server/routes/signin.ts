import { RequestHandler } from "express";
// import { generateAccessToken } from "../utils/jwt";

export const SignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  // console.log("SignIn request received:", req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  return res
    .status(201)
    .json({ message: "User signed up successfully", user: { email } ,  } );
};

export default SignIn;
