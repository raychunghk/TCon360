import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
//import Providers from "next-auth/providers"
export const authOptions = {

  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials)
        const res = await fetch('/absproxy/5000/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()
        if (res.ok && user) {
          return { ...user, email: credentials.email }
        }
        return null
      }
    }),
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      // Add access_token to jwt token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return Promise.resolve(token);
    },
    /*session: async (session, token) => {
      // Add access_token to session
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return Promise.resolve(session);
    }*/
   
    async session(session, user) {
      // Add the basePath to the session object
      session.basePath = '/absproxy/5000/api/auth';
      session.user = user;
      return session;
    },
  },
 // basePath: '/absproxy/5000',
}

//export default (req, res) => NextAuth(req, res, options)
export default NextAuth(authOptions)