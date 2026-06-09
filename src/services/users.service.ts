import { api } from "@/lib/api"
import type { Paginated } from "@/types/api"
import type { UserList } from "@/types/user"

export const usersService = {
    // Lista paginada de usuarios. `params`: search, ordering, page.
    // Devuelve { count, next, previous, results }.
    getUsers: async (params: Record<string, unknown>) => {
        const response = await api.get<Paginated<UserList>>("/users/", { params })
        return response.data
    },
}
