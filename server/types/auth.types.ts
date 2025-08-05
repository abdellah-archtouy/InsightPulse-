
export interface GoogleTokenPayload {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  }
  
  export interface AuthenticatedUser {
    id: number; 
    name: string | null;
    email: string;
    avatar: string | null;
    username: string | null;
    firstName: string | null;
    lastname: string | null;
  }
  
  export interface JWTPayload {
    userId: number; 
    email: string;
    iat?: number;
    exp?: number;
  }
  
  declare global {
    namespace Express {
      interface User extends AuthenticatedUser {}
      interface Request {
        user?: User;
      }
    }
  }
  