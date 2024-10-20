import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        login: { label: "Email or UNS", type: "text", placeholder: "Email or Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const login = String(credentials.login);
          const password = String(credentials.password);

          // Determine if login is email or uns
          const isEmail = login.includes('@');

          const res = await axios.post("https://api.granularx.com/auth/signin?platform=web", {
            [isEmail ? 'email' : 'uns']: login, // Backend should handle both email and UNS
            password: password,
          });

          const user = res.data;

          if (user.status === "SUCCESS") {
            // Extract tokens from response headers
            const cookies = res.headers['set-cookie'];
            const csrfToken = res.headers['x-csrf-token'];
            let authToken, refreshToken;

            cookies.forEach(cookie => {
              if (cookie.startsWith('Auth-Token=')) {
                authToken = cookie.split('Auth-Token=')[1].split(';')[0]; // Extract the token part
              } else if (cookie.startsWith('Refresh-Token=')) {
                refreshToken = cookie.split('Refresh-Token=')[1].split(';')[0]; // Extract the token part
              }
            });
            
            return {
              id: user.data.wallet_id,
              username: user.data.username,
              email: user.data.email,
              phoneNumber: user.data.phonenumber,
              walletId: user.data.wallet_id,
              has_wallet: user.data.has_wallet, 
              mailbox_id: user.data.mailbox_id,
              authToken: authToken || null,
              refreshToken: refreshToken || null,
              csrfToken: csrfToken || null,
            };
          } else {
            throw new Error(user.error || "Authentication failed");
          }
        } catch (error) {
          throw new Error(error.response?.data?.error || "An error occurred during authentication");
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.walletId = user.walletId;
        token.has_wallet = user.has_wallet;
        token.mailbox_id = user.mailbox_id;
        token.authToken = user.authToken;
        token.refreshToken = user.refreshToken;
        token.csrfToken = user.csrfToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        username: token.username,
        email: token.email,
        phoneNumber: token.phoneNumber,
        walletId: token.walletId,
        has_wallet: token.has_wallet,
        mailbox_id: token.mailbox_id
      };
      session.csrfToken = token.csrfToken;
      session.authToken = token.authToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});