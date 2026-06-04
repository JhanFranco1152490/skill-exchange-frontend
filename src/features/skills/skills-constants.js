import {
    Briefcase,
    Code,
    MessageSquare,
    MoreHorizontal,
    Palette,
    Sprout,
    Users,
} from "lucide-react"

// Categorías del API (value) con su etiqueta e icono para el filtro
const SKILL_CATEGORIES = [
    { value: "technical", label: "Technical", icon: Code },
    { value: "creative", label: "Creative", icon: Palette },
    { value: "communication", label: "Communication", icon: MessageSquare },
    { value: "leadership", label: "Leadership", icon: Users },
    { value: "business", label: "Business", icon: Briefcase },
    { value: "personal_development", label: "Personal development", icon: Sprout },
    { value: "other", label: "Other", icon: MoreHorizontal },
]

// Niveles con la clase de color del badge (verde→rojo según dificultad)
const SKILL_LEVELS = {
    beginner: { label: "Beginner", className: "border-green-200 bg-green-50 text-green-700" },
    intermediate: { label: "Intermediate", className: "border-blue-200 bg-blue-50 text-blue-700" },
    advanced: { label: "Advanced", className: "border-orange-200 bg-orange-50 text-orange-700" },
    expert: { label: "Expert", className: "border-red-200 bg-red-50 text-red-700" },
}

// Opciones del selector de orden (mapea al param `ordering` del API)
const SKILL_ORDERING = [
    { value: "name", label: "Nombre A–Z" },
    { value: "-name", label: "Nombre Z–A" },
    { value: "-created_at", label: "Más recientes" },
    { value: "created_at", label: "Más antiguas" },
]

// Etiqueta legible de una categoría a partir de su value ("technical" → "Technical")
const categoryLabel = (value) =>
    SKILL_CATEGORIES.find((c) => c.value === value)?.label ?? value

export { SKILL_CATEGORIES, SKILL_LEVELS, SKILL_ORDERING, categoryLabel }
