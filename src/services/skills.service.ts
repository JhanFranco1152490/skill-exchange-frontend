import { api } from "@/lib/api"
import type { Paginated } from "@/types/api"
import type { SkillDetail, SkillList, SkillParams } from "@/types/skill"

export const skillsService = {
    // Lista paginada. `params` son los query params (category, level,
    // ordering, search, page). Devuelve { count, next, previous, results }.
    getSkills: async (params: SkillParams) => {
        const response = await api.get<Paginated<SkillList>>("/skills/", { params })
        return response.data
    },

    // Detalle de una skill por id
    getSkill: async (id: SkillDetail["id"] | string) => {
        const response = await api.get<SkillDetail>(`/skills/${id}/`)
        return response.data
    },
}