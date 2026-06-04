"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Menú colapsable para pantallas pequeñas (mobile-first).
function HamburgerMenu({ links, onLogout }) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const close = () => setOpen(false)

    return (
        <div className="relative md:hidden">
            <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setOpen((v) => !v)}
                aria-label="Abrir menú"
            >
                {open ? <X /> : <Menu />}
            </Button>

            {open && (
                <>
                    {/* Capa para cerrar al tocar fuera */}
                    <div className="fixed inset-0 z-10" onClick={close} />
                    <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border bg-card shadow-md">
                        <nav className="flex flex-col py-1">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={close}
                                    className={cn(
                                        "px-4 py-2 text-sm transition-colors",
                                        pathname === link.href
                                            ? "bg-muted font-medium text-foreground"
                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    close()
                                    onLogout()
                                }}
                                className="border-t px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            >
                                Cerrar sesión
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </div>
    )
}

export { HamburgerMenu }
