"use client"

import { useCollection } from "@/hooks/useCollection"
import { usersService } from "@/services/users.service"
import { userColumns } from "@/features/users/users-columns"
import { DataTable } from "@/components/data-display/data-table"
import { SearchInput } from "@/components/ui/SearchInput"
import { Pagination } from "@/components/ui/Pagination"
import { LoadingState } from "@/components/ui/LoadingState"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { EmptyState } from "@/components/ui/EmptyState"
import { UserList } from "@/types/user"

export default function UsersPage() {
  const {
    data: users,
    count,
    pageSize,
    params,
    isLoading,
    error,
    setQuery,
    setPage,
    reload,
  } = useCollection<UserList>({
    fetcher: usersService.getUsers,
    loadError: () => "No se pudieron cargar los usuarios.",
  })

  return (
    <main className="flex-1 p-6 space-y-6">
      <h2 className="text-xl font-semibold">Usuarios</h2>

      <div className="sm:max-w-xs">
        <SearchInput
          placeholder="Buscar por nombre o email..."
          onSearch={(search) => setQuery({ search })}
        />
      </div>

      {isLoading ? (
        <LoadingState message="Cargando usuarios..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : users.length === 0 ? (
        <EmptyState title="Sin usuarios" message="No encontramos usuarios con esa búsqueda." />
      ) : (
        <>
          <div className="rounded-md border">
            <DataTable<UserList> columns={userColumns} data={users} />
          </div>
          <Pagination
            count={count}
            page={params.page ?? 1}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  )
}
