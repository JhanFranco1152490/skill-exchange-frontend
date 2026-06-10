"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    message?: string
    onRetry: () => Promise<void>
}

// Mensaje de error cuando una petición al API falla. Si recibe `onRetry`,
// muestra un botón para reintentar.
function ErrorMessage({ message = "Ocurrió un error al cargar los datos.", onRetry }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-muted-foreground">{message}</p>
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                    Reintentar
                </Button>
            )}
        </div>
    )
}

export { ErrorMessage }