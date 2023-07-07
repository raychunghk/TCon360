import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import { parseCookies, setCookie } from 'nookies';
import CredentialsProvider from 'next-auth/providers/credentials';
// import Providers from "next-auth/providers"
export const authOptions = {
  basePath: '/absproxy/5000/api/auth',
  //    baseUrl: 'https://code2.raygor.cc/absproxy/5000',
  providers: [
    {
      id: 'custom-provider',
      name: 'Custom Provider',
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
      // return {
      //     id: "test-user",
      //     name: "Test User",
      //     email: "testuser@example.com",
      //     image: "https://example.com/testuser.jpg",
      // };
      // },
      type: 'credentials',
      authorize: async (credentials) => {
        console.log('credentials?');
        console.log(credentials);
        // get the token cookie using nookies
        // const cookies = parseCookies();
        const token = credentials.token;
        console.log('provider token');
        console.log(token);
        // decode the JWT token and extract the user's information
        try {
          console.log('jwt secret:' + process.env.JWT_SECRET);
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          console.log('Decoded token:', decodedToken); // log the decoded token
          const { id, name, email, username } = decodedToken;
          console.log('decodedToken');
          console.log(decodedToken);
          // check if the token matches the credentials
          if (credentials.token === token) {
            // return the user object with their information
            let rtn = {
              id: decodedToken.sub,
              name: username,
              email: email,
              picture: '',
              username: username,
            };
            console.log('rtn?');
            return rtn;
          }
        } catch (error) {
          console.log('rror');
          console.log(error);
          // if the token is invalid, return null to indicate that the credentials are invalid
          return null;
        }

        // if the token does not match the credentials, return null to indicate that the credentials are invalid
        return null;
      },
    },
  ],
  redirect: false,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
  session: {
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
  callbacks: {
    // async jwt(token, user, account, profile, isNewUser) {
    async jwt({ token, account }) {
      // get the token cookie using nookies
      const cookies = parseCookies();
      const tokenCookie = cookies.token;
      console.log('token cookie');
      console.log(tokenCookie);
      console.log('jwt is called');

      console.log('account');
      console.log(account);
      // if there's a token cookie, add it to the JWT token
      if (tokenCookie) {
        token.token = tokenCookie;
      }
      console.log('token');
      console.log(token);

      return token;
    },

    async session({ session, token, user }) {
      // get the token cookie using nookies
      const cookies = parseCookies();
      console.log('session is called');
      console.log('session ?');
      console.log(session);

      console.log('nx session token?');
      console.log(token);
      console.log('nx now?');
      console.log(new Date());

      const iat = new Date(token['iat'] * 1000);

      console.log('nx Token iat  on:', iat);
      const expDate = new Date(token['exp'] * 1000);

      console.log('nx Token expires on:', expDate);
      console.log('user?');
      console.log({ user });
      // Check if token has expired
      if (new Date().getTime() > expDate.getTime()) {
        console.log('Token has expired. Removing from session.');
        delete session.token;
      } else {
        session.user = {
          name: token.name,
          email: token.email,
        };
        session.basePath = '/absproxy/5000';
        // add the token to the session object
        session.token = token;

        console.log(session.token);
      }

      return session;
    },
  },
  session: {
    jwt: true,
  },
  jw: {
    secret: process.env.JWT_SECRET,
  },
  // basePath: '/absproxy/5000',
};

// export default (req, res) => NextAuth(req, res, options)
export default NextAuth(authOptions);
