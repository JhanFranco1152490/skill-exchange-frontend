"use client"

import { useAuth } from "@/hooks/useAuth"
import React from "react"

const AuthContext = React.createContext()

function AuthProvider({ children }) {

    const auth = useAuth()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }