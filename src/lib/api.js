import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const ACCESS_KEY = "access_token"
const REFRESH_KEY = "refresh_token"

const getToken = (key) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null

const clearTokens = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

api.interceptors.request.use((config) => {
  const token = getToken(ACCESS_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Cuando el access token expira (401), refrescamos una vez y reintentamos
// la petición original.
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // No intentamos refrescar en los propios endpoints de token
    const isAuthRoute = originalRequest.url?.includes("/token/")

    if (error.response?.status !== 401 || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error)
    }

    const refresh = getToken(REFRESH_KEY)
    if (!refresh) {
      clearTokens()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const { data } = await api.post("/token/refresh/", { refresh })
      localStorage.setItem(ACCESS_KEY, data.access)
      return api(originalRequest)
    } catch (refreshError) {
      clearTokens()
      return Promise.reject(refreshError)
    }
  }
)

export { api }
