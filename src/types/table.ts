import { ReactNode } from "react"

export type TableColumn<T> = {
    key: keyof T
    header: string
    className?: string
    render?: (value:T[keyof T], row:T) => ReactNode
    hidden?: boolean
}