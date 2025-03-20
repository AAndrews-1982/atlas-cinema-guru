import NextAuth from "next-auth";
import { type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * Define NextAuth options
 */
export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      return session;
    },
  },
};

/**
 * Initialize and export `auth()`
 */
export const { auth } = NextAuth(authOptions);
