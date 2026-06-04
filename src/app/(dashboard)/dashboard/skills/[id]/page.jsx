"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingState } from "@/components/ui/LoadingState"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { useResource } from "@/hooks/useResource"
import { skillsService } from "@/services/skills.service"
import { SKILL_LEVELS, categoryLabel } from "@/features/skills/skills-constants"

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—"

export default function SkillDetailPage() {
  const { id } = useParams()
  const {
    data: skill,
    isLoading,
    error,
    reload,
  } = useResource({
    fetcher: skillsService.getSkill,
    id,
    loadError: () => "No se pudo cargar la skill.",
  })

  const level = skill && SKILL_LEVELS[skill.level]

  return (
    <main className="flex-1 p-6 space-y-6">
      <Link
        href="/dashboard/skills"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a Skills
      </Link>

      {isLoading ? (
        <LoadingState message="Cargando skill..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : (
        skill && (
          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{skill.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {categoryLabel(skill.category)}
                  </p>
                </div>
                {level && (
                  <Badge variant="outline" className={level.className}>
                    {level.label}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {skill.description && <p className="text-sm">{skill.description}</p>}

              <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <Meta label="ID" value={`#${skill.id}`} />
                <Meta label="Categoría" value={categoryLabel(skill.category)} />
                <Meta label="Nivel" value={level?.label ?? skill.level} />
                <Meta label="Creada" value={formatDate(skill.created_at)} />
                <Meta label="Actualizada" value={formatDate(skill.updated_at)} />
              </dl>
            </CardContent>
          </Card>
        )
      )}
    </main>
  )
}

function Meta({ label, value }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
