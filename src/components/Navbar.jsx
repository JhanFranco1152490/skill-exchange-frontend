"use client"

import { useContext } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/AuthContext"
import { HamburgerMenu } from "@/components/HamburgerMenu"

const NAV_LINKS = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/dashboard/skills", label: "Skills" },
    { href: "/dashboard/users", label: "Usuarios" },
    { href: "/dashboard/goals", label: "Metas" },
]

// Barra de navegación principal
function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        router.replace("/login")
    }

    return (
        <header className="flex items-center justify-between border-b px-6 py-3">
            <div className="flex items-center gap-6">
                <span className="text-base font-semibold">Skill Exchange</span>
                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "rounded-md px-3 py-1.5 text-sm transition-colors",
                                pathname === link.href
                                    ? "bg-muted font-medium text-foreground"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
            >
                Cerrar sesión
            </Button>

            <HamburgerMenu links={NAV_LINKS} onLogout={handleLogout} />
        </header>
    )
}

export { Navbar }
