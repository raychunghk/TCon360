// app/api/auth/[...nextauth]/route.js
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import { parseCookies } from 'nookies';
import CredentialsProvider from 'next-auth/providers/credentials';
import { format, parseISO } from 'date-fns';

export const authOptions = {
  baseUrl: 'https://code2.raygor.cc/absproxy/5000', // Adjust if needed
  providers: [
    {
      id: 'custom-provider',
      name: 'Custom Provider',
      type: 'credentials',
      authorize: async (credentials) => {
        try {
          const token = credentials.token;
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          const { id, name, email, username, staff } = decodedToken;

          if (credentials.token === token) {
            return {
              id: decodedToken.sub,
              name: username,
              email: email,
              picture: '',
              username: username,
              staff,
              tkn: token,
            };
          }
        } catch (error) {
          console.error('Token verification error:', error);
          return null;
        }

        return null;
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && user.hasOwnProperty('staff')) {
        token.staff = user.staff[0];
      }
      if (user?.hasOwnProperty('tkn')) {
        token.tkn = user.tkn;
      }

      if (account) {
        return token;
      }

      if (token.hasOwnProperty('exp') && Date.now() / 1000 < token.exp) {
        return token;
      }
      return null; // Token expired
    },

    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        staff: token.staff,
      };
      session.basePath = '/absproxy/5000';
      session.token = token;

      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
  },
  secret: process.env.NEXTAUTH_SECRET, // Add this line
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
