import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        uns: { label: "UNS", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.uns || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        try {
          const response = axios.post('https://api.granularx.com/auth/signin?platform=web', {
            uns: credentials.uns,
            password: credentials.password
          });

          if (response.data) {
            return response.data
          }

          throw new Error('Invalid credentials')
        } catch (error) {
          console.error('Authentication error:', error.response?.data || error.message);
          throw new Error(error.response?.data?.error || 'Authentication failed')
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
})