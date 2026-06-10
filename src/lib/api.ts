import { TOKEN_KEYS } from "@/types/tokens"
import axios, { isAxiosError } from "axios"

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const getToken = (key: string): string | null =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null

const clearTokens = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEYS.access)
  localStorage.removeItem(TOKEN_KEYS.refresh)
}

api.interceptors.request.use((config) => {
  const token = getToken(TOKEN_KEYS.access)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Cuando el access token expira (401), refrescamos una vez y reintentamos
// la petición original.
api.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error)

    const originalRequest = error.config

    if (!originalRequest) return Promise.reject(error)

    // No intentamos refrescar en los propios endpoints de token
    const isAuthRoute = originalRequest.url?.includes("/token/") ?? false

    if (error.response?.status !== 401 || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error)
    }

    const refresh = getToken(TOKEN_KEYS.refresh)
    if (!refresh) {
      clearTokens()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const { data } = await api.post<{ access: string }>("/token/refresh/", { refresh })
      localStorage.setItem(TOKEN_KEYS.access, data.access)
      return api(originalRequest)
    } catch (refreshError) {
      clearTokens()
      return Promise.reject(refreshError)
    }
  }
)

export { api }
