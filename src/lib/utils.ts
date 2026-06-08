import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Formatea una fecha ISO al español. `long` usa el mes completo
export function formatDate(value: string | null, { long = false } = {}): string {
  if (!value) return "—"
  return new Date(value).toLocaleDateString(
    "es-ES",
    long
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "numeric", month: "short", year: "numeric" }
  )
}
