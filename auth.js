import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        uns: { label: "UNS", type: "text", placeholder: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post("https://api.granularx.com/auth/signin?platform=web", {
            uns: credentials.uns,
            password: credentials.password,
          });
      
          const user = response.data;
      
          if (user && user.status === 'SUCCESS') {
            return {
              id: user.data.WalletID, // Using WalletID as the unique identifier
              username: user.data.Username,
              phoneNumber: user.data.Phonenumber,
              walletId: user.data.WalletID,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.response?.data?.error || "Authentication failed");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.phoneNumber = user.phoneNumber;
        token.walletId = user.walletId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        username: token.username,
        phoneNumber: token.phoneNumber,
        walletId: token.walletId,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
});