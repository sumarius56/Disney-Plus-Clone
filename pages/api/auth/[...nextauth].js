import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import * as firestoreFunctions from "firebase/firestore";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,

  adapter: FirebaseAdapter({
    db: db,
    ...firestoreFunctions,
  }),
});
