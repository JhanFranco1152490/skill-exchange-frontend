import { useEffect, useState } from "react"

// Hook genérico para un único recurso por id (hermano de useCollection).
// Recibe un `fetcher` y maneja los estados de carga/error.
function useResource({
    fetcher,
    id,
    loadError = () => "Error al cargar el recurso.",
}) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const load = async () => {
        try {
            setIsLoading(true)
            setError("")
            setData(await fetcher(id))
        } catch (err) {
            setError(err.response?.data?.detail || loadError(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id != null) load()
    }, [id])

    return { data, isLoading, error, reload: load }
}

export { useResource }
