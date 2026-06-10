"use client"

import { SKILL_ORDERING } from "@/features/skills/skills-constants"

type Props = {
    value: string
    onChange: (value: string) => void
}

// Dropdown para elegir el orden de los resultados (param `ordering`)
function OrderSelector({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
            {SKILL_ORDERING.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}

export { OrderSelector }
