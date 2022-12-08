import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import fs from 'fs';
import path from 'path';

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jonfken" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     if (credentials.username === process.env.USERNAME && credentials.password === process.env.PASSWORD) {
    //       return {
    //         id: 1,
    //         name: "test account",
    //         email: "nstet@hotmail.com"
    //       }
    //     }
    //     return null
    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  callbacks: {
    async signIn({ user }) {

      const authorized_emails = process.env.AUTHORIZED_EMAILS.split(',')
      if (authorized_emails.includes(user.email)) {
        return true
      }
      return false
    },
  }
}

export default NextAuth(authOptions)
