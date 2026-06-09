import type { Category, Level } from "./api"

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
