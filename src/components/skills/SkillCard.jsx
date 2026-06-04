import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SKILL_LEVELS, categoryLabel } from "@/features/skills/skills-constants"

// Tarjeta con nombre, categoría y nivel de una skill. Lleva al detalle.
function SkillCard({ skill }) {
    const level = SKILL_LEVELS[skill.level]

    return (
        <Link href={`/dashboard/skills/${skill.id}`}>
            <Card className="h-full transition-colors hover:bg-muted/40">
                <CardContent className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {categoryLabel(skill.category)}
                        </p>
                    </div>
                    {level && (
                        <Badge variant="outline" className={level.className}>
                            {level.label}
                        </Badge>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}

export { SkillCard }
