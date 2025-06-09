import { getToken, JWT } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ERole } from "./types/interface/IJwtPayload.interface"

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== ERole.ADMIN)
    return NextResponse.redirect(new URL("/not-authorized", req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
}
