export type Paginated<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export type QueryParams = Record<string, unknown>

export type Category = "technical" | "creative" | "communication" | "leadership" | "business" | "personal_development" | "other"
export type Level = "beginner" | "intermediate" | "advanced" | "expert"
export type GoalStatus = "active" | "paused" | "achieved" | "archived"
export type GoalType = "skill" | "community" | "project" | "mentoring" | "certification" | "contribution"