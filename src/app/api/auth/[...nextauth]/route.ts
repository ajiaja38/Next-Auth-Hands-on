/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { api } from "../../api"
import { ResponseEntity } from "@/types/interface/IResponse.interface"
import { ILoginResponse } from "@/types/interface/IAuth.interface"
import {
  ERole,
  IJwtPayload,
  ISessionPayload,
} from "@/types/interface/IJwtPayload.interface"
import { jwtDecode } from "jwt-decode"

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ISessionPayload> {
        try {
          const response: ResponseEntity<ILoginResponse> = await api.post(
            "auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )

          const tokenDecode: IJwtPayload = jwtDecode(response.data.accessToken)

          return {
            id: tokenDecode.id,
            role: tokenDecode.role,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }
        } catch (error: any) {
          throw new Error(error.response.data.message)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          token.role = ERole.USER
          token.id = user.id ?? ""
          token.email = user.email ?? ""
        } else {
          token = { ...token, ...user }
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
