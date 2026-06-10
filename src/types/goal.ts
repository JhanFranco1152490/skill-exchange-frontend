import type { SkillSummary } from "./skill"
import type { UserSummary } from "./user"

export type GoalStatus = "active" | "paused" | "achieved" | "archived"
export type GoalType = "skill" | "community" | "project" | "mentoring" | "certification" | "contribution"


export interface Goal {
  readonly id: number
  user: UserSummary
  title: string
  goal_type?: GoalType
  status?: GoalStatus
  target_date?: string | null
  target_value?: string
  current_value?: string
  skill: SkillSummary
  readonly created_at: string
  readonly updated_at: string
}