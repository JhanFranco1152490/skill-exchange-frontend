"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Input de búsqueda con debounce: avisa onSearch tras `delay` ms sin teclear.
// Omite el primer render para no disparar una búsqueda vacía al montar.
function SearchInput({ onSearch, placeholder = "Buscar...", delay = 400 }) {
    const [value, setValue] = useState("")
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const id = setTimeout(() => onSearch(value), delay)
        return () => clearTimeout(id)
    }, [value])

    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="pl-8"
            />
        </div>
    )
}

export { SearchInput }