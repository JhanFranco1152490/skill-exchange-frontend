import { api } from "@/lib/api"

export const skillsService = {
    // Lista paginada. `params` son los query params (category, level,
    // ordering, search, page). Devuelve { count, next, previous, results }.
    getSkills: async (params) => {
        const response = await api.get("/skills/", { params })
        return response.data
    },

    // Detalle de una skill por id
    getSkill: async (id) => {
        const response = await api.get(`/skills/${id}/`)
        return response.data
    },
}