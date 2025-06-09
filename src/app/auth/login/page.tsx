"use client"

import { getSession, signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ERole } from "@/types/interface/IJwtPayload.interface"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) {
      const session = await getSession()

      if (session?.user.role === ERole.ADMIN) router.push("/admin/dashboard")

      if (session?.user.role === ERole.USER) router.push("/user/dashboard")
    } else {
      alert(res?.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-96 p-6 border"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-4 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-4 border"
      />
      <button type="submit" className="p-4 border bg-lime-400">
        Login
      </button>
    </form>
  )
}
