import { api } from "@/lib/api"

export const authService = {
    // Devuelve { access, refresh }
    login: async (data) => {
        const response = await api.post("/token/", data)
        return response.data
    },

    // Datos del usuario autenticado
    me: async () => {
        const response = await api.get("/users/me/")
        return response.data
    },
}