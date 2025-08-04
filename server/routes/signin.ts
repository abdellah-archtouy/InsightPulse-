import { RequestHandler } from "express";
import { generateAccessToken , generateRefreshToken} from "../utils/jwt";
import { prisma } from "../../prisma/Client";

export const SignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log("SignIn request received:", req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user, prisma);
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, });
  res.cookie('token', token, { httpOnly: false});
  return res
    .status(201)
    .json({ message: "User signed up successfully", user: user } );
};

export default SignIn;
