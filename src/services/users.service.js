import { api } from "@/lib/api"

export const usersService = {
    // Lista paginada de usuarios. `params`: search, ordering, page.
    // Devuelve { count, next, previous, results }.
    getUsers: async (params) => {
        const response = await api.get("/users/", { params })
        return response.data
    },
}
