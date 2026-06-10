import { authService } from "@/services/auth.service"
import { Login } from "@/types/auth"
import { TOKEN_KEYS } from "@/types/tokens"
import { UserMe } from "@/types/user"
import { isAxiosError } from "axios"
import { useState } from "react"


function useAuth() {

    const [user, setUser] = useState<UserMe>()
    const [loading, setLoading] = useState(true)
    const [errorLogin, setErrorLogin] = useState("")

    const login = async (data: Login): Promise<void> => {
        try {
            setErrorLogin("")
            const { access, refresh } = await authService.login(data)
            localStorage.setItem(TOKEN_KEYS.access, access)
            localStorage.setItem(TOKEN_KEYS.refresh, refresh)
            await me()
        } catch (err) {
            const detail = isAxiosError(err) ? err.response?.data?.detail : null
            setErrorLogin(detail ?? "Credenciales incorrectas. Inténtalo de nuevo.")
        }
    }

    const me = async (): Promise<void> => {
        try {
            // Sin token no tiene sentido pedir el perfil
            if (!localStorage.getItem(TOKEN_KEYS.access)) {
                setUser(undefined)
                return
            }
            setUser(await authService.me())
        } catch (err) {
            setUser(undefined)
        } finally {
            setLoading(false)
        }
    }

    const logout = (): void => {
        localStorage.removeItem(TOKEN_KEYS.access)
        localStorage.removeItem(TOKEN_KEYS.refresh)
        setUser(undefined)
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