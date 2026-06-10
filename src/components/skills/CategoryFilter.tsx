"use client"

import { Button } from "@/components/ui/button"
import { SKILL_CATEGORIES } from "@/features/skills/skills-constants"
import type { Category } from "@/types/skill"

type Props = {
    value: Category | undefined
    onChange: (value: Category | undefined) => void
}

// Botones de categoría. Click en la categoría activa la limpia (undefined = sin filtro).
function CategoryFilter({ value, onChange }: Props) {
    return (
        <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const active = value === cat.value
                return (
                    <Button
                        key={cat.value}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        onClick={() => onChange(active ? undefined : cat.value)}
                    >
                        <Icon />
                        {cat.label}
                    </Button>
                )
            })}
        </div>
    )
}

export { CategoryFilter }
