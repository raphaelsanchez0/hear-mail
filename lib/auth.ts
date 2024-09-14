import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GMAIL_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to the specific page, e.g., "/dashboard"
      return `${baseUrl}/email`;
    },
  },
};
