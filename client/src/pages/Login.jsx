import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'
import { setToken } from '../lib/auth.js'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = useMemo(() => location.state?.from || '/dashboard', [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const data = await apiFetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!data?.success || !data?.token) {
        setError(data?.message || 'Login failed')
        return
      }

      setToken(data.token)
      setMessage(data.message || 'Logged in')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="title">Login</h1>
        <p className="muted">Use your email & password to get a JWT token.</p>

        <form onSubmit={onSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
          <Link to="/register" className="nav-link">
            Create account
          </Link>
        </div>

        {error ? <div className="alert">{error}</div> : null}
        {message ? <div className="text-success" style={{ marginTop: 12 }}>{message}</div> : null}
        </form>

        <div className="muted" style={{ marginTop: 16, fontSize: 13 }}>
          Backend endpoint: <span className="mono">/api/user/login</span>
        </div>
      </div>
    </div>
  )
}
