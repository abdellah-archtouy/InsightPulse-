import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { User } from '@prisma/client';
import {prisma} from '../../prisma/Client';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!
  }, async (
    accessToken: string, 
    refreshToken: string, 
    profile: Profile, 
    done: (error: any, user?: any) => void
  ) => {
    try {
      const email = profile.emails?.[0]?.value;
      const avatar = profile.photos?.[0]?.value;
  
      if (!email) {
        return done(new Error('No email found in Google profile'), undefined);
      }

      let existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { googleId: profile.id },
            { email: email }
          ]
        }
      });
  
      if (existingUser) {
        if (!existingUser.googleId) {
          const updatedUser = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              googleId: profile.id,
              avatar: avatar || null,
              emailVerified: true
            }
          });
          return done(null, updatedUser);
        }
        return done(null, existingUser);
      }

      const newUser = await prisma.user.create({
        data: {
          googleId: profile.id,
          name: profile.displayName || null,
          email: email,
          avatar: avatar || null,
          emailVerified: true,
        }
      });
  
      return done(null, newUser);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, undefined);
    }
  }));

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  export default passport;