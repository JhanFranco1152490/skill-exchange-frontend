import { useEffect, useState } from "react"

// Hook genérico para listas paginadas del API.
// Recibe un `fetcher` (la función del service) y maneja los query params,
// la respuesta paginada ({ count, next, previous, results }) y los estados
// de carga/error. Todo el filtrado/orden/búsqueda/paginación es server-side:
// cada cambio de params dispara una nueva llamada al API.
function useCollection({
    fetcher,
    initialParams = {},
    loadError = () => "Error al cargar los datos. Verifica tu conexión.",
}) {

    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [params, setParams] = useState({ page: 1, ...initialParams })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    // Quita params vacíos para no enviar ?category= o ?search= en blanco
    const cleanParams = (raw) =>
        Object.fromEntries(
            Object.entries(raw).filter(([, value]) => value !== "" && value != null)
        )

    const load = async () => {
        try {
            setIsLoading(true)
            setError("")
            const res = await fetcher(cleanParams(params))
            setData(res.results)
            setCount(res.count)
            // Una página con "next" está llena: su tamaño es el pageSize real
            if (res.next || params.page === 1) setPageSize(res.results.length)
        } catch (err) {
            setError(err.response?.data?.detail || loadError(err))
        } finally {
            setIsLoading(false)
        }
    }

    // Refetch cada vez que cambian los params (filtro, orden, búsqueda, página)
    useEffect(() => {
        load()
    }, [params])

    // Cambiar un filtro/orden/búsqueda vuelve a la página 1
    const setQuery = (patch) =>
        setParams((prev) => ({ ...prev, ...patch, page: 1 }))

    const setPage = (page) =>
        setParams((prev) => ({ ...prev, page }))

    // Reemplaza un item en la lista local tras una mutación, sin recargar
    const updateItem = (updated) =>
        setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))

    return {
        data,
        count,
        pageSize,
        params,
        isLoading,
        error,
        setQuery,
        setPage,
        updateItem,
        reload: load,
    }
}

export { useCollection }