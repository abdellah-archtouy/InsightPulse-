import { RequestHandler } from "express";
import { prisma } from "../../prisma/Client";
// import { generateAccessToken } from "../utils/jwt";

export const SignUp: RequestHandler = async (req, res) => {
  const { email, password ,firstName , lastName, company} = req.body;
  // console.log("SignUp request received:", req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  const result = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastname: lastName,
      company,
    },
  });
  if (!result) {
    return res.status(500).json({ error: "Failed to create user" });
  }
  return res
    .status(201)
    .json({ message: "User signed up successfully", user:  result   } );
};

export default SignUp;
