"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { Navbar } from "../../../components/layout/Navbar"
import { NAV_LINKS } from "../../../features/links/nav-links"

export default function DashboardLayout({ children }: {children: ReactNode}) {
  const router = useRouter()

  const { user, loading, me } = useAuthContext()

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
