# Skill Exchange — Frontend

Aplicación web que consume el API REST de **Skills Exchange** (Django REST Framework con autenticación JWT). Permite explorar habilidades con filtros, orden, búsqueda y paginación; ver usuarios; y gestionar metas de aprendizaje con progreso y una acción para marcarlas como alcanzadas.

Construido con **Next.js**, **React**, **Tailwind CS** y componentes **shadcn**. Las peticiones se centralizan con **axios**.

## Decisiones de arquitectura

- **API centralizado en `lib/api.js`.** Una sola instancia de axios con un interceptor de *request* que añade el `Bearer <access_token>` y uno de *response* que, ante un `401`, refresca el token una vez y reintenta la petición original.

- **Hooks genéricos en vez de lógica repetida.** Se creó `useCollection` que recibe el `fetcher` del service y maneja params, respuesta paginada (`count`/`next`/`results`) y estados de carga/error. Tambien se creó `useResource` que hace lo mismo para un item único. Así Skills, Users y Goals comparten la misma lógica sin duplicarla.

- **Hook de feature solo cuando hay acción.** Skills y Users son listas puras y usan `useCollection` directo. Goals **sí** tiene una acción (`achieve`), así que `useGoals` envuelve `useCollection` y añade esa lógica — actualizando el item en local (`updateItem`) en vez de recargar toda la lista para no hacer una llamada innecesaria a la lista de Goals.

- **Componentes reutilizables.** `Pagination` (recibe `count`, `page`, `pageSize`,`onPageChange`) se usa en las tres listas. `LoadingState`, `ErrorMessage` y `EmptyState` cubren los estados de UI en cada página. `DataTable` es una tabla genérica manejada por un array de columnas.

- **Auth con JWT en localStorage** Se usó `useAuth` + `AuthContext` para que el layout protegido y la navbar consuman el mismo estado. El layout del dashboard redirige a `/login` si no hay usuario.

- **Búsqueda con debounce.** El `SearchInput` espera ~400 ms tras dejar de teclear antes de disparar la petición, para no llamar al API en cada tecla. Los demás filtros (categoría, orden, página) son una petición por interacción.

- **Estructura de carpetas del proyecto** Separación de responsabilidadades de cada archivo a traves de carpetas de acuerdo a su función: `app`, `components`, `context`, `features`, `hooks`, `lib`, `services`.
