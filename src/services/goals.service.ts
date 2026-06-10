import { api } from "@/lib/api"
import type { Paginated, QueryParams } from "@/types/api"
import type { Goal } from "@/types/goal"

export const goalsService = {
    // Lista paginada de metas del usuario. Devuelve { count, next, previous, results }.
    getGoals: async (params: QueryParams) => {
        const response = await api.get<Paginated<Goal>>("/goals/", { params })
        return response.data
    },

    // Marca una meta como alcanzada (100% de progreso). Devuelve la meta actualizada.
    achieve: async (id:Goal["id"] | string) => {
        const response = await api.post<Goal>(`/goals/${id}/achieve/`, {})
        return response.data
    },
}
