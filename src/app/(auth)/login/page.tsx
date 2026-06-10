"use client"

import { Button } from "@/components/ui/button"
import { FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthContext } from "@/context/AuthContext"
import { Login } from "@/types/auth"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>()

  const { user, errorLogin, login } = useAuthContext()

  // Si el login fue exitoso (ya hay usuario), entramos al dashboard
  useEffect(() => {
    if (user) router.replace("/dashboard")
  }, [user])

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>

      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingresa un email válido",
                },
              })}
            />
            <FormMessage>{errors.email?.message}</FormMessage>
          </FormField>

          <FormField>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            <FormMessage>{errors.password?.message}</FormMessage>
          </FormField>

          {errorLogin && (
            <p className="text-sm font-medium text-destructive">{errorLogin}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          ⚠️ Nota: Los tokens se guardan en localStorage solo para fines educativos.
          En producción usar httpOnly cookies.
        </p>
      </div>
    </div>
  )
}
