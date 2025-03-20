import { type NextAuthConfig } from "next-auth"; // Correct import
import GitHubProvider from "next-auth/providers/github";

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
