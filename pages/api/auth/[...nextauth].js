import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

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
}
export default NextAuth(authOptions)
