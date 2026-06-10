"use client"

import { Button } from "@/components/ui/button"
import { SKILL_CATEGORIES } from "@/features/skills/skills-constants"

type Props = {
    value: string
    onChange: (value: string) => void
}

// Botones de categoría. Click en la categoría activa la limpia (toggle).
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
                        onClick={() => onChange(active ? "" : cat.value)}
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
