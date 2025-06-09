import { ISessionPayload } from "@/types/interface/IJwtPayload.interface"
import "next-auth"

declare module "next-auth" {
  type User = ISessionPayload

  interface Session extends DefaultSession {
    user: User
    expires_in: string
    error: string
  }
}
