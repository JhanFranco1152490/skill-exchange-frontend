"use client"

import { useGoals } from "@/hooks/useGoals"
import { GoalCard } from "@/components/goals/GoalCard"
import { Pagination } from "@/components/ui/Pagination"
import { LoadingState } from "@/components/ui/LoadingState"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { EmptyState } from "@/components/ui/EmptyState"

export default function GoalsPage() {
  const {
    data: goals,
    count,
    pageSize,
    params,
    isLoading,
    error,
    setPage,
    reload,
    achieve,
    achievingId,
  } = useGoals()

  return (
    <main className="flex-1 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Metas de Aprendizaje</h2>
        <p className="text-sm text-muted-foreground">
          Establece objetivos de estudio, mide tu progreso y alcanza tus metas.
        </p>
      </div>

      {isLoading ? (
        <LoadingState message="Cargando metas..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : goals.length === 0 ? (
        <EmptyState title="Sin metas" message="Aún no tienes metas de aprendizaje." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onAchieve={achieve}
                achieving={achievingId === goal.id}
              />
            ))}
          </div>
          <Pagination
            count={count}
            page={params.page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  )
}
