import { formatDate } from "@/lib/utils"
import { TableColumn } from "@/types/table"
import { UserList } from "@/types/user"

// Iniciales para el avatar ("Jhan Franco" → "JF")
const initials = (user: UserList) =>
    `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase()

// Columnas de la tabla de usuarios (formato que consume DataTable)
const userColumns: TableColumn<UserList>[] = [
    {
        key: "first_name",
        header: "Usuario",
        render: (value, row) => (
            <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {initials(row)}
                </span>
                <span className="font-medium">
                    {row.first_name} {row.last_name}
                </span>
            </div>
        ),
    },
    {
        key: "email",
        header: "Email",
    },
    {
        key: "date_joined",
        header: "Fecha de ingreso",
        render: (value) => {
            if (typeof value !== "string") return null
            return formatDate(value)
        }
    },
]

export { userColumns }
