export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}

export interface ILoginRefreshResponse {
  accessToken: string
  refreshToken: string
}
