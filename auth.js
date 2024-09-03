import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        uns: { label: "UNS", type: "text", placeholder: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const uns = String(credentials.uns); 
          const password = String(credentials.password); 

          const res = await axios.post("https://api.granularx.com/auth/signin?platform=web", {
            uns: uns,
            password: password,
          });
    
          const user = res.data; // Access data directly from res.data with Axios
  
          if (user.status === "SUCCESS") {
            return {
              id: user.data.WalletID,
              username: user.data.Username,
              phoneNumber: user.data.Phonenumber,
              walletId: user.data.WalletID,
            };
          } else if (user.status === "FAILED") {
            console.log(user.data);
            throw new Error(user.data || "An error occurred during authentication");
          }
        } catch (error) {
          throw new Error(error || "An error occurred during authentication");
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.phoneNumber = user.phoneNumber;
        token.walletId = user.walletId;
        // Set an expiration time for the token (e.g., 2 hours from now)
        token.exp = Math.floor(Date.now() / 1000) + 120 * 60;
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
      // Check if the token has expired
      if (Date.now() / 1000 > token.exp) {
        throw new Error('TokenExpired');
      }
      return session;
    },
  },
});