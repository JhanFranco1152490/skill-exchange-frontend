import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Tabla genérica manejada por un array de columnas:
// { key, header, className?, render?(value, row), hidden? }
function DataTable({ columns, data, ...props }) {
    columns = columns.filter((column) => !column.hidden)

    return (
        <Table {...props}>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={row.id ?? index}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                                {column.render
                                    ? column.render(row[column.key], row)
                                    : row[column.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export { DataTable }
