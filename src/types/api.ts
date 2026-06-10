export type Paginated<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

// Params comunes a cualquier colección paginada. Cada entidad los extiende
// con sus propios filtros (ej. SkillParams añade category/level).
export type QueryParams = {
    page?: number
    search?: string
    ordering?: string
}