"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, BookOpen, Layers, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FEATURES = [
  { icon: Layers, title: "Categorías organizadas", desc: "Técnicas, creativas, de comunicación y más." },
  { icon: BookOpen, title: "Detalle de cada skill", desc: "Nivel, descripción y datos de cada habilidad." },
  { icon: Users, title: "Comunidad activa", desc: "Explora los perfiles de otros usuarios." },
]

export default function Home() {
  const router = useRouter()

  // Si ya hay sesión, entramos directo al dashboard
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.replace("/dashboard")
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="text-base font-semibold">Skill Exchange</span>
        <Link href="/login">
          <Button size="sm">Iniciar sesión</Button>
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl space-y-6 px-4 py-20 text-center">
          <span className="inline-block rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Plataforma académica · Open API
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Descubre y comparte{" "}
            <span className="underline decoration-primary">habilidades</span>
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Skill Exchange es la plataforma donde el conocimiento se convierte en conexión.
            Explora cientos de habilidades, filtra por categoría y encuentra lo que necesitas.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login">
              <Button>
                Empezar ahora <ArrowRight />
              </Button>
            </Link>
          </div>
        </section>

        <section className="border-t bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-5xl space-y-8">
            <h2 className="text-center text-lg font-semibold">
              Todo lo que necesitas en un solo lugar
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}