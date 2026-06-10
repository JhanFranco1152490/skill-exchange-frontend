import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TableColumn } from "@/types/table"

type Props<T> = {
    columns: TableColumn<T>[]
    data: T[]
}

// Tabla genérica manejada por un array de columnas:
// { key, header, className?, render?(value, row), hidden? }
function DataTable<T extends { id: number | string }>({
    columns,
    data,
    ...props
}: Props<T>) {
    columns = columns.filter((column) => !column.hidden)

    return (
        <Table {...props}>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={String(column.key)} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={row.id ?? index}>
                        {columns.map((column) => (
                            <TableCell key={String(column.key)}>
                                {column.render
                                    ? column.render(row[column.key], row)
                                    : String(row[column.key])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export { DataTable }
