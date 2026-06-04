import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formatea una fecha ISO al español. `long` usa el mes completo
// ("21 de mayo de 2026") vs. abreviado ("21 may 2026").
export function formatDate(value, { long = false } = {}) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString(
    "es-ES",
    long
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "numeric", month: "short", year: "numeric" }
  )
}
