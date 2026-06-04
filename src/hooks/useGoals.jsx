import { useState } from "react"
import { useCollection } from "@/hooks/useCollection"
import { goalsService } from "@/services/goals.service"

// Metas del usuario: lista paginada (useCollection) + la acción "Alcanzar".
function useGoals() {
    const { updateItem, ...collection } = useCollection({
        fetcher: goalsService.getGoals,
        loadError: () => "No se pudieron cargar las metas.",
    })

    // id de la meta que se está marcando, para deshabilitar solo ese botón
    const [achievingId, setAchievingId] = useState(null)

    const achieve = async (id) => {
        try {
            setAchievingId(id)
            const updated = await goalsService.achieve(id)
            updateItem(updated)
        } finally {
            setAchievingId(null)
        }
    }

    return { ...collection, achieve, achievingId }
}

export { useGoals }
