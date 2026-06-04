"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Paginación reutilizable. Calcula el total de páginas a partir de `count` y
// `pageSize`, y avisa el cambio con `onPageChange`.
function Pagination({ count, page, pageSize, onPageChange }) {
    const totalPages = pageSize > 0 ? Math.ceil(count / pageSize) : 0

    if (totalPages <= 1) return null

    const from = (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, count)

    const goTo = (target) => {
        if (target >= 1 && target <= totalPages && target !== page) {
            onPageChange(target)
        }
    }

    return (
        <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-sm text-muted-foreground">
                {from}–{to} de {count}
            </span>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => goTo(page - 1)}
                    disabled={page <= 1}
                >
                    <ChevronLeft />
                </Button>

                {getPageNumbers(page, totalPages).map((item, index) =>
                    item === "…" ? (
                        <span key={`gap-${index}`} className="px-2 text-sm text-muted-foreground">
                            …
                        </span>
                    ) : (
                        <Button
                            key={item}
                            variant={item === page ? "default" : "outline"}
                            size="icon-sm"
                            onClick={() => goTo(item)}
                        >
                            {item}
                        </Button>
                    )
                )}

                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => goTo(page + 1)}
                    disabled={page >= totalPages}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}

// Números de página a mostrar; intercala "…" cuando hay demasiadas
function getPageNumbers(page, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages = [1]
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    if (start > 2) pages.push("…")
    for (let p = start; p <= end; p++) pages.push(p)
    if (end < totalPages - 1) pages.push("…")
    pages.push(totalPages)

    return pages
}

export { Pagination }