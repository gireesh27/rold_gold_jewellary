import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phoneNumber?: string | null;
    }
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "otp",
      name: "OTP",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "One-Time Password", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.otp) {
          return null;
        }
        
        try {
          if (credentials.otp === "123456") {
            return {
              id: credentials.phoneNumber, 
              name: null,
              email: null,
              phoneNumber: credentials.phoneNumber,
            };
          }
          
          return null;
        } catch (error) {
          console.error("Error verifying OTP:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username === "user" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        if ('phoneNumber' in user) {
          token.phoneNumber = user.phoneNumber;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.phoneNumber) {
          session.user.phoneNumber = token.phoneNumber as string;
        }
      }
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
