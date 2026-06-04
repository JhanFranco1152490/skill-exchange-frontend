"use client"

import { CalendarDays, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

// Porcentaje de progreso a partir de los valores decimales (string) del API
const progressPercent = (current, target) => {
    const c = parseFloat(current ?? 0)
    const t = parseFloat(target ?? 0)
    if (!t || t <= 0) return 0
    return Math.min(100, Math.round((c / t) * 100))
}

// Tarjeta de meta: progreso porcentual + botón "Alcanzar".
function GoalCard({ goal, onAchieve, achieving }) {
    const achieved = goal.status === "achieved"
    const percent = progressPercent(goal.current_value, goal.target_value)

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <CardTitle>{goal.title}</CardTitle>
                        {goal.skill && (
                            <p className="text-sm text-muted-foreground">
                                Skill vinculada:{" "}
                                <span className="font-medium text-foreground">{goal.skill.name}</span>
                            </p>
                        )}
                    </div>
                    {achieved && (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                            <CheckCircle2 /> Alcanzada
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-medium">
                            {goal.current_value ?? "0"} / {goal.target_value ?? "0"} ({percent}%)
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-green-500 transition-all"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    {goal.target_date ? (
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" /> Límite: {formatDate(goal.target_date)}
                        </span>
                    ) : (
                        <span />
                    )}

                    {!achieved && (
                        <Button size="sm" onClick={() => onAchieve(goal.id)} disabled={achieving}>
                            {achieving ? "Marcando..." : "Alcanzar"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export { GoalCard }
