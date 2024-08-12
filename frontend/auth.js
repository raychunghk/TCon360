import NextAuth from 'next-auth';
import jwt from 'jsonwebtoken';

import { parseCookies, setCookie } from 'nookies';
import CredentialsProvider from 'next-auth/providers/credentials';
import { format, parseISO } from 'date-fns';
const config = require('@/../baseconfig');
const { baseconfig } = config;
const { prefix: _prefix, frontendport, backendport, mainport } = baseconfig;
const _frontendurl = `http://127.0.0.1:${frontendport}`;
const _backendurl = `http://127.0.0.1:${backendport}`;
// import Providers from "next-auth/providers"
//basePath: '/visa/api/auth',
// basePath: `https://code2.raygor.cc/absproxy/${frontendport}/api/auth`,
//baseUrl: `https://code2.raygor.cc/absproxy/${frontendport}`,
export const authOptions = {
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
          const { id, name, email, username, staff } = decodedToken;
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
              staff,
              tkn: token,
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
  callbacks: {
    // async jwt(token, user, account, profile, isNewUser) {

    async jwt(jwtobj) {
      const { token, user, account, profile, isNewUser } = jwtobj;

      const logJwtCallback = (description, variable) => logCallback('jwt', description, variable);

      logJwtCallback('jwtobj', JSON.stringify(jwtobj));

      const cookies = parseCookies();
      logJwtCallback('cookies', cookies);

      logJwtCallback('users?', user);

      logJwtCallback('Account:', account);

      if (user && user.hasOwnProperty('staff')) {
        token.staff = user.staff[0];
      }
      if (user?.hasOwnProperty('tkn')) {
        token.tkn = user.tkn;
      }
      logJwtCallback('token in jwt', token);

      if (token.hasOwnProperty('exp')) {
        const expdate = new Date(token.exp * 1000 + 5000);
        //logJwtCallback('now compared with expdate');
        logJwtCallback('token expiry date', expdate);

        const now = new Date().getTime() / 1000;
        const _now = format(now, 'dd/MMM/yyyy HH:mm:ss');
        logJwtCallback(`token expiry:${expdate} datevs now:${_now} `, '');

        if (token.hasOwnProperty('exp') && now < token.exp) {
          logJwtCallback('New date is earlier than token expiration', '');
          return token;
        }
      }
      if (account) {
        return token;
      }
    },

    async session({ session, token, user }) {
      const formatDate = (dateString) => {
        if (dateString) {
          const date = parseISO(dateString + '');
          console.log('parsing date date string:', dateString);
          console.log('parsing date date:', date);
          const formattedDate = format(date, 'yyyy-MMM-dd');
          return formattedDate;
        }
      };
      const logSessionCallback = (description, ...args) =>
        logCallback('session callback:', description, ...args);

      const cookies = parseCookies();
      logSessionCallback('session?', session);
      logSessionCallback('token?', token);
      //logSessionCallback('user in session?', { user });
      //const _now = new Date().getTime() / 1000;
      const _now = new Date();
      const formattedDate = _now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      logSessionCallback('formatted now:', formattedDate);

      if (token.hasOwnProperty('exp')) {
        const expdate = new Date(token.exp * 1000);
        logSessionCallback('token expiry date', expdate);
      }

      const now = new Date().getTime() / 1000;
      if (token.hasOwnProperty('exp') && now < token.exp) {
        logSessionCallback('New date is earlier than token expiration');
        session.user = {
          name: token.name,
          email: token.email,
          staff: token.staff,
        };
        // session.basePath = '/absproxy/3333';
        session.token = token;
        logSessionCallback('session.token?', session.token);
        logSessionCallback('session.user?', session.user);
        return session;
      } else {
        logSessionCallback('token is expired');
      }
    },
    async signOut({ redirect }) {
      // Destroy session cookies upon signout
      console.log('signout next auth called');
      await fetch('/api/auth/callback/logout');
      await redirect('/');
    },
    async signIn(userDetail) {
      console.log('hello, user detail in Sig in', userDetail);
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
  session: {
    jwt: true,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
};
function logCallback(context, description, ...args) {
  const prefixedDescription = `${context} callback: ${description}`;
  console.log(prefixedDescription, ...args);
}
// export default (req, res) => NextAuth(req, res, options)

//const handler = NextAuth(authOptions);

/*
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})*/
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
