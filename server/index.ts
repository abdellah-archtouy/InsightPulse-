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
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

dotenv.config({path: '../.env'});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export function createServer() {
  console.log('🔍 Environment Variables Check:');
  console.log('MY_SECRET:', process.env.MY_SECRET ? '✅ Loaded' : '❌ Missing');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Missing');
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Loaded' : '❌ Missing');
  console.log('Environment file path: ../.env');
  const app = express();


  app.use(cors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    credentials: true
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/users", cookeiJwtAuth, async (_req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastname: true,
          name: true,
          avatar: true,
          bio: true,
          company: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.post("/api/auth/google", async (req, res) => {
    try {
      const { idToken } = req.body;
      
      if (!idToken) {
        return res.status(400).json({ error: 'ID token is required' });
      }

      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID!,
      });
      
      const payload = ticket.getPayload();
      
      if (!payload || !payload.email) {
        return res.status(400).json({ error: 'Invalid token payload' });
      }

      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { googleId: payload.sub },
            { email: payload.email }
          ]
        }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name || null,
            firstName: payload.given_name || null,
            lastname: payload.family_name || null,
            avatar: payload.picture || null,
            emailVerified: true,
          }
        });
      } else if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: payload.sub,
            avatar: payload.picture || null,
            emailVerified: true,
            firstName: user.firstName || payload.given_name || null,
            lastname: user.lastname || payload.family_name || null,
          }
        });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
          firstName: user.firstName,
          lastname: user.lastname
        }
      });
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  app.get("/api/auth/me", cookeiJwtAuth, async (req: any, res) => {
    try {
      res.json({
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          avatar: req.user.avatar,
          username: req.user.username,
          firstName: req.user.firstName,
          lastname: req.user.lastname
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  });

  app.post("/api/auth/logout", (_req, res) => {
    res.clearCookie('authToken');
    res.json({ success: true });
  });

  app.post("/api/signup", SignUp);
  app.post("/api/signin", SignIn);
  app.get("/api/demo", handleDemo);

  return app;
}
