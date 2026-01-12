import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'

export function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
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
      const data = await apiFetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })

      if (!data?.success) {
        setError(data?.message || 'Registration failed')
        return
      }

      setMessage(data.message || 'Registered successfully')
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="title">Create account</h1>
        <p className="muted">Register first, then login to get your token.</p>

        <form onSubmit={onSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Register'}
          </button>
          <Link to="/login" className="nav-link">
            Back to login
          </Link>
        </div>

        {error ? <div className="alert">{error}</div> : null}
        {message ? <div className="text-success" style={{ marginTop: 12 }}>{message}</div> : null}
        </form>

        <div className="muted" style={{ marginTop: 16, fontSize: 13 }}>
          Backend endpoint: <span className="mono">/api/user/register</span>
        </div>
      </div>
    </div>
  )
}
