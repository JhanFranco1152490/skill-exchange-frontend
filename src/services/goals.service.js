import { api } from "@/lib/api"

export const goalsService = {
    // Lista paginada de metas del usuario. Devuelve { count, next, previous, results }.
    getGoals: async (params) => {
        const response = await api.get("/goals/", { params })
        return response.data
    },

    // Marca una meta como alcanzada (100% de progreso). Devuelve la meta actualizada.
    achieve: async (id) => {
        const response = await api.post(`/goals/${id}/achieve/`, {})
        return response.data
    },
}
