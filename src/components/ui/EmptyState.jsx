import { Inbox } from "lucide-react"

// Mensaje amigable cuando la lista de resultados está vacía.
function EmptyState({ title = "Sin resultados", message = "No hay nada que mostrar aquí." }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    )
}

export { EmptyState }