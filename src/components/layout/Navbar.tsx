"use client"

import { HamburgerMenu } from "@/components/layout/HamburgerMenu"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { NavLink } from "@/types/link"

// Barra de navegación principal
function Navbar({ links }: { links: NavLink[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useAuthContext()

    const handleLogout = () => {
        logout()
        router.replace("/login")
    }

    return (
        <header className="flex items-center justify-between border-b px-6 py-3">
            <div className="flex items-center gap-6">
                <span className="text-base font-semibold">Skill Exchange</span>
                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
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

            <HamburgerMenu links={links} onLogout={handleLogout} />
        </header>
    )
}

export { Navbar }
