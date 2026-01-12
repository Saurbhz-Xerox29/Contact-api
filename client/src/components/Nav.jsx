import { Link, useNavigate } from 'react-router-dom'
import { clearToken, getToken } from '../lib/auth.js'

export function Nav() {
  const navigate = useNavigate()
  const isAuthed = Boolean(getToken())

  function onLogout() {
    clearToken()
    navigate('/login')
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            Contact API
          </Link>
          <span className="nav-subtitle">React Portal</span>
        </div>

        <nav className="nav-links">
          {isAuthed ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <button className="btn btn-ghost" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
