import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { UserSession, UserToken } from './types/user.interface';

declare module 'next-auth' {
  interface User {
    accessToken: string;
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
});
