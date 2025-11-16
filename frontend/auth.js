/* eslint-disable no-undef */
// auth.js
import { config } from '@tcon360/config';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { parseCookies } from 'nookies';

// Logging utility with timestamp
const logAuth = (description, details = {}) => {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(`[Auth][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

logAuth('Initializing authOptions', {
  config: { basepath: config.basepath, frontendport: config.frontendport },
  env: {
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    jwtSecret: !!process.env.JWT_SECRET,
    tokenMaxAge: process.env.TOKEN_MAX_AGE,
  },
});

const { prefix: _prefix, frontendport, backendport, mainport } = config;
const _frontendurl = `http://127.0.0.1:${frontendport}`;
const _backendurl = `http://127.0.0.1:${backendport}`;

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'custom-provider',
      name: 'Custom Provider',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        logAuth('Authorize called', { hasToken: !!credentials?.token });
        try {
          if (!credentials?.token) {
            logAuth('Authorize: No token provided');
            return null;
          }
          logAuth('Authorize: Verifying JWT', { secret: !!process.env.JWT_SECRET });
          const decodedToken = jwt.verify(credentials.token, process.env.JWT_SECRET);
          logAuth('Authorize: Decoded token', { decodedToken });
          const { sub, name, email, username, staff } = decodedToken;
          logAuth('Authorize: Validating token payload', { sub, username });
          if (!sub || !username) {
            logAuth('Authorize: Invalid token payload', { sub, username });
            return null;
          }
          const user = {
            id: sub,
            name: username,
            email: email || '',
            picture: '',
            username,
            staff: staff || [],
            tkn: credentials.token,
          };
          logAuth('Authorize: Returning user', { user });
          return user;
        } catch (error) {
          logAuth('Authorize: Error', { error: error.message, stack: error.stack });
          return null;
        }
      },
    }),
  ],
  basePath: config.basepath ? `${config.basepath}/api/auth` : '/api/auth',
  callbacks: {
    async jwt({ token, user, account }) {
      logAuth('JWT callback called', { token, user, account });
      try {
        const cookies = parseCookies();
        logAuth('JWT: Cookies', { cookies });
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.staff = user.staff || [];
          token.tkn = user.tkn;
          logAuth('JWT: Updated token', { token });
        }
        if (token.exp) {
          const expDate = new Date(token.exp * 1000);
          const now = new Date().getTime() / 1000;
          logAuth('JWT: Token expiry check', { expDate, now });
          if (now >= token.exp) {
            logAuth('JWT: Token expired');
            return null;
          }
        }
        return token;
      } catch (error) {
        logAuth('JWT: Error', { error: error.message, stack: error.stack });
        return null;
      }
    },
    async session({ session, token }) {
      logAuth('Session callback called', { session, token });
      try {
        const cookies = parseCookies();
        logAuth('Session AuthJS callback: Cookies', { cookies });
        if (token && token.id) {
          session.user = {
            id: token.id,
            name: token.name || '',
            email: token.email || '',
            staff: token.staff || [],
          };
          session.token = token.tkn;
          logAuth('Session AuthJS callback: Updated session', { session });
          if (token.exp) {
            const expDate = new Date(token.exp * 1000);
            const now = new Date().getTime() / 1000;
            logAuth('Session AuthJS callback: Token expiry check', { expDate, now });
            if (now >= token.exp) {
              logAuth('Session AuthJS callback: Token expired');
              return null;
            }
          }
          return session;
        }
        logAuth('Session AuthJS callback: No valid token');
        return null;
      } catch (error) {
        logAuth('Session AuthJS callback: Error', { error: error.message, stack: error.stack });
        return null;
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      logAuth('SignIn callback called', { user, account, profile, credentials: !!credentials });
      try {
        if (!user || Object.keys(user).length === 0) {
          logAuth('SignIn: Invalid or empty user object');
          return false;
        }
        logAuth('SignIn: User validated', { user });
        return true;
      } catch (error) {
        logAuth('SignIn: Error', { error: error.message, stack: error.stack });
        return false;
      }
    },
    async signOut() {
      logAuth('SignOut callback called');
      try {
        logAuth('SignOut: Completed');
        return true;
      } catch (error) {
        logAuth('SignOut: Error', { error: error.message, stack: error.stack });
        return false;
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.TOKEN_MAX_AGE) || 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

logAuth('authOptions configured', {
  providers: authOptions.providers.map(p => p.id),
  basePath: authOptions.basePath,
  session: authOptions.session,
});

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);