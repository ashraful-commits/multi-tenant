import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import UserModel from "../../../../model/UserModel";
import  mongodbConnection  from "../../../../config/Mongodbconnect";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        mongodbConnection();
        const { email, password } = credentials;

        const user = await UserModel.findOne({ email });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin",
  },
};
