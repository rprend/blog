import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
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
