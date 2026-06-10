"use client"

import { useAuth } from "@/hooks/useAuth"
import { createContext, ReactNode, useContext } from "react"

type AuthContextValue = ReturnType<typeof useAuth>

const AuthContext = createContext<AuthContextValue | null>(null)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw Error("useAuthContext debe usarse dentro de un AuthProvider")
    return context
}

function AuthProvider({ children }: { children: ReactNode }) {

    const auth = useAuth()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider, useAuthContext }
