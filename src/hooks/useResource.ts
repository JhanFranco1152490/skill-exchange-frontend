import { isAxiosError } from "axios"
import { useEffect, useState } from "react"

export type ResourceID = number | string

type ResourceProps<T> = {
    fetcher: (id: ResourceID) => Promise<T>
    id: ResourceID
    loadError?: (err: unknown) => string
}

// Hook genérico para un único recurso por id (hermano de useCollection).
// Recibe un `fetcher` y maneja los estados de carga/error.
function useResource<T>({
    fetcher,
    id,
    loadError = () => "Error al cargar el recurso.",
}: ResourceProps<T>) {
    const [data, setData] = useState<T>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const load = async (): Promise<void> => {
        try {
            setIsLoading(true)
            setError("")
            setData(await fetcher(id))
        } catch (err) {
            const detail = isAxiosError(err) ? err.response?.data?.detail : null
            setError(detail ?? loadError(err))
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
