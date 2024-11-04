import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // Import path from GitHub

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png", // Start with logo
    brandColor: "#1ED2AF", // Then specify the brand color
    buttonText: "#ffffff", // Lastly, button text color
  },
  providers: [
    GitHubProvider({ // Use the correct GitHub provider import
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          response_type: "code",
          access_type: "offline",
          prompt: "consent"
        },
      },
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Return true if auth is not null, false otherwise
      return auth ? true : false;
    },
  },
});
