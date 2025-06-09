"use client"

import React, { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "antd"

const Page = () => {
  const { data } = useSession()

  const logout = () => {
    signOut({
      callbackUrl: "/login",
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <Button variant="solid" color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export default Page
