"use client"

import { useCollection } from "@/hooks/useCollection"
import { skillsService } from "@/services/skills.service"
import { SkillCard } from "@/components/skills/SkillCard"
import { CategoryFilter } from "@/components/skills/CategoryFilter"
import { OrderSelector } from "@/components/skills/OrderSelector"
import { SearchInput } from "@/components/ui/SearchInput"
import { Pagination } from "@/components/ui/Pagination"
import { LoadingState } from "@/components/ui/LoadingState"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { EmptyState } from "@/components/ui/EmptyState"
import { SkillList, SkillParams } from "@/types/skill"

export default function SkillsPage() {
  const {
    data: skills,
    count,
    pageSize,
    params,
    isLoading,
    error,
    setQuery,
    setPage,
    reload,
  } = useCollection<SkillList, SkillParams>({
    fetcher: skillsService.getSkills,
    initialParams: { ordering: "name" },
    loadError: () => "No se pudieron cargar las skills.",
  })

  return (
    <main className="flex-1 p-6 space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <CategoryFilter
        value={params.category}
        onChange={(category) => setQuery({ category })}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-xs sm:flex-1">
          <SearchInput placeholder="Buscar skills..." onSearch={(search) => setQuery({ search })} />
        </div>
        <OrderSelector
          value={params.ordering ?? ""}
          onChange={(ordering) => setQuery({ ordering })}
        />
      </div>

      {isLoading ? (
        <LoadingState message="Cargando skills..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : skills.length === 0 ? (
        <EmptyState title="Sin skills" message="No encontramos skills con esos filtros." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
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
