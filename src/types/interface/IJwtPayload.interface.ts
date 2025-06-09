import { ILoginResponse } from "./IAuth.interface"

export enum ERole {
  ADMIN = "admin",
  USER = "user",
}

export interface IJwtPayload {
  id: string
  name: string
  email: string
  role: ERole
  iat: number
  exp: number
}

export interface ISessionPayload extends ILoginResponse {
  id: string
  role: ERole
}
