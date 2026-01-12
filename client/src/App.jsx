import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Nav } from './components/Nav.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { getToken } from './lib/auth.js'

function App() {
  const isAuthed = Boolean(getToken())

  return (
    <div className="app">
      <Nav />

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
