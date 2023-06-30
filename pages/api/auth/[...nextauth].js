import jwt from "jsonwebtoken";
import NextAuth from 'next-auth'
import { parseCookies, setCookie } from "nookies";
import CredentialsProvider from "next-auth/providers/credentials"
//import Providers from "next-auth/providers"
export const authOptions = {

  providers: [
    {
      id: "custom-provider",
      name: "Custom Provider",
      // type: "oauth",
      // version: "2.0",
      // client_id:"123",
      // clientid:"456",
      // scope: "openid profile email",
      // params: { grant_type: "authorization_code" },
      // accessTokenUrl: "https://example.com/oauth2/token",
      // authorizationUrl: "https://example.com/oauth2/auth",
      // profileUrl: "https://example.com/api/user",
      // profile: (profile) => {
      //   return {
      //     id: "test-user",
      //     name: "Test User",
      //     email: "testuser@example.com",
      //     image: "https://example.com/testuser.jpg",
      //   };
      // },
      type: "credentials",
      authorize: async (credentials) => {
        console.log('credentials?')
        console.log(credentials)
        // get the token cookie using nookies
        //  const cookies = parseCookies();
        const token = credentials.token;
        console.log('provider token')
        console.log(token)
        // decode the JWT token and extract the user's information
        try {
          console.log('jwt secret:' + process.env.JWT_SECRET);
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          console.log("Decoded token:", decodedToken); // log the decoded token
          const { id, name, email, username } = decodedToken;
          console.log('decodedToken')
          console.log(decodedToken)
          // check if the token matches the credentials
          if (credentials.token === token) {
            // return the user object with their information
            return { id, name, email, username };
          }
        } catch (error) {
          console.log('rror')
          console.log(error)
          // if the token is invalid, return null to indicate that the credentials are invalid
          return null;
        }

        // if the token does not match the credentials, return null to indicate that the credentials are invalid
        return null;
      },
    },
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // get the token cookie using nookies
      const cookies = parseCookies();
      const tokenCookie = cookies.token;

      // if there's a token cookie, add it to the JWT token
      if (tokenCookie) {
        token.token = tokenCookie;
      }

      return token;
    },

    async session(session, user) {
      // get the token cookie using nookies
      const cookies = parseCookies();
      const token = cookies.token;
      console.log('session is called');
      // add the token to the session object
      session.token = token;
      console.log('token?')
      console.log(session.token)
      return session;
    },
  },
  session: {
    jwt: true,
  }
  , jw: {
    secret: process.env.JWT_SECRET,
  }
  // basePath: '/absproxy/5000',
}

//export default (req, res) => NextAuth(req, res, options)
export default NextAuth(authOptions)