export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Backend expects the JWT in this header
export const AUTH_HEADER_NAME = 'Auth'

export function toApiUrl(path) {
  if (!API_BASE_URL) return path
  return `${API_BASE_URL}${path}`
}
