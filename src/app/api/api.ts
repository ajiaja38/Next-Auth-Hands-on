import type { AxiosInstance } from "axios"
import axios from "axios"

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
