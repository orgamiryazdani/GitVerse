import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { UserSession, UserToken } from './types/user.interface';
import axios from 'axios';
import { API_URL } from './configs/global';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    username: string;
  }

  interface Session {
    user: UserSession;
  }

  interface JWT {
    user: UserToken;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHubProvider],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        const {
          data: { login },
        } = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });
        token.username = login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.username = token.username as string;
      return session;
    },
  },
});
