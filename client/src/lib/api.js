import { getToken } from './auth.js'
import { AUTH_HEADER_NAME, toApiUrl } from './config.js'

export async function apiFetch(path, { auth = false, headers, ...init } = {}) {
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...(headers || {}),
  }

  if (auth) {
    const token = getToken()
    if (token) requestHeaders[AUTH_HEADER_NAME] = token
  }

  let res
  try {
    res = await fetch(toApiUrl(path), {
      ...init,
      headers: requestHeaders,
    })
  } catch (err) {
    const base = new Error(
      'Cannot reach backend. From the client folder, run `npm run dev` (it starts backend + frontend together).'
    )
    base.cause = err
    throw base
  }

  let data
  try {
    data = await res.json()
  } catch {
    data = { message: 'Invalid JSON response from server' }
  }

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}
