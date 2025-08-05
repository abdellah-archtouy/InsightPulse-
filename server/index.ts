import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { SignUp } from "./routes/signup";
import SignIn from "./routes/signin";
import { prisma } from "../prisma/Client";
import dotenv from 'dotenv';
import cookeiJwtAuth from "./middleware/cookieJwtAuth";
import cookieParser from "cookie-parser";

dotenv.config({path: '../.env'});


export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/users", cookeiJwtAuth, async (_req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

  app.post("/api/signup", SignUp);
  app.post("/api/signin", SignIn);
  app.get("/api/demo", handleDemo);

  return app;
}
