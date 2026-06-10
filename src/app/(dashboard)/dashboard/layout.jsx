"use client"

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import { Navbar } from "../../../components/layout/Navbar"
import { NAV_LINKS } from "../../../features/links/nav-links"

export default function DashboardLayout({ children }) {
  const router = useRouter()

  const { user, loading, me } = useContext(AuthContext)

  // Cargamos el usuario
  useEffect(() => {
    me()
  }, [])

  //Sin usuario devolvemos al login
  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [user, loading])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar links={NAV_LINKS}/>
      {children}
    </div>
  )
}
