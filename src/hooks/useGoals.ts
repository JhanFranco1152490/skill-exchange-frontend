import { useCollection } from "@/hooks/useCollection"
import { goalsService } from "@/services/goals.service"
import { Goal } from "@/types/goal"
import { useState } from "react"

// Metas del usuario: lista paginada (useCollection) + la acción "Alcanzar".
function useGoals() {
    const { updateItem, ...collection } = useCollection<Goal>({
        fetcher: goalsService.getGoals,
        loadError: () => "No se pudieron cargar las metas.",
    })

    // id de la meta que se está marcando, para deshabilitar solo ese botón
    const [achievingId, setAchievingId] = useState<string | number>()

    const achieve = async (id: string | number): Promise<void> => {
        try {
            setAchievingId(id)
            const updated = await goalsService.achieve(id)
            updateItem(updated)
        } finally {
            setAchievingId(undefined)
        }
    }

    return { ...collection, achieve, achievingId }
}

export { useGoals }
