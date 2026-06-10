import type { LucideIcon } from "lucide-react"

export type Category = "technical" | "creative" | "communication" | "leadership" | "business" | "personal_development" | "other"
export type Level = "beginner" | "intermediate" | "advanced" | "expert"
export type Order = "name" | "-name" | "created_at" | "-created_at"

export interface SkillSummary {
    readonly id: number
    name: string
    category: Category
    level: Level
}

export interface SkillList extends SkillSummary {
    parent: number | null
    readonly created_at: string
    readonly updated_at: string
}

export interface SkillDetail extends Omit<SkillList, "parent"> {
    description: string
    parent: SkillSummary | null
    subskills: SkillSummary[]
}

export type CategoryOption = {
    value: Category
    label: string
    icon: LucideIcon
}

export type LevelStyle = Record<Level, { label: string, className: string }>

export type OrderOption = {
    value: Order
    label: string
}