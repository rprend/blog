import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jonfken" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.username === process.username && credentials.password === process.env.PASSWORD) {
          return {
            id: 1,
            name: "test account",
            email: "nstet@hotmail.com"
          }
        }
        return null
      }
    })
    ],

}
export default NextAuth(authOptions)
