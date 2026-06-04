import { authService } from "@/services/auth.service"
import { useState } from "react"

function useAuth() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorLogin, setErrorLogin] = useState("")

    const login = async (data) => {
        try {
            setErrorLogin("")
            const { access, refresh } = await authService.login(data)
            localStorage.setItem("access_token", access)
            localStorage.setItem("refresh_token", refresh)
            await me()
        } catch (err) {
            setErrorLogin(err.response?.data?.detail || "Credenciales incorrectas. Inténtalo de nuevo.")
        }
    }

    const me = async () => {
        try {
            // Sin token no tiene sentido pedir el perfil
            if (!localStorage.getItem("access_token")) {
                setUser(null)
                return
            }
            setUser(await authService.me())
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setUser(null)
    }

    return {
        user,
        loading,
        errorLogin,
        login,
        me,
        logout,
    }
}

export { useAuth }