import { api } from "@/lib/api"
import type { JWTTokens, Login } from "@/types/auth"
import type { UserMe } from "@/types/user"

export const authService = {
    // Devuelve { access, refresh }
    login: async (data: Login) => {
        const response = await api.post<JWTTokens>("/token/", data)
        return response.data
    },

    // Datos del usuario autenticado
    me: async () => {
        const response = await api.get<UserMe>("/users/me/")
        return response.data
    },
}