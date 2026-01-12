import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { getUserIdFromToken } from '../lib/auth.js'

export function Dashboard() {
  const userId = useMemo(() => getUserIdFromToken(), [])

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('personal')
  const [saving, setSaving] = useState(false)

  const loadContacts = useCallback(async () => {
    if (!userId) return
    setError('')
    setLoading(true)

    try {
      const data = await apiFetch(`/api/contact/userid/${userId}`, { method: 'GET' })
      setContacts(Array.isArray(data?.userContact) ? data.userContact : [])
    } catch (err) {
      setError(err?.message || 'Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  async function onCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const data = await apiFetch('/api/contact/new', {
        method: 'POST',
        auth: true,
        body: JSON.stringify({ name, email, phone, type }),
      })

      if (!data?.success) {
        setError(data?.message || 'Failed to create contact')
        return
      }

      setName('')
      setEmail('')
      setPhone('')
      setType('personal')
      await loadContacts()
    } catch (err) {
      setError(err?.message || 'Failed to create contact')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="row">
      <section className="card">
        <h1 className="title">Dashboard</h1>
        <p className="muted">
          Token userId: <span className="mono">{userId || '(missing)'}</span>
        </p>

        {!userId ? (
          <div className="alert">
            Could not read userId from token. Please login again.
          </div>
        ) : null}

        <h2 style={{ marginTop: 16, marginBottom: 10 }}>Create Contact</h2>
        <form onSubmit={onCreate}>
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="field">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="personal">personal</option>
              <option value="professional">professional</option>
            </select>
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit" disabled={saving || !userId}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button className="btn btn-ghost" type="button" onClick={loadContacts} disabled={loading || !userId}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {error ? <div className="alert">{error}</div> : null}
        </form>
      </section>

      <section className="card">
        <h2 style={{ margin: 0 }}>My Contacts</h2>
        <p className="muted" style={{ marginBottom: 10 }}>
          Loaded from <span className="mono">/api/contact/userid/:id</span>
        </p>

        <div className="list">
          {contacts.length === 0 && !loading ? (
            <div className="muted">No contacts yet.</div>
          ) : null}

          {contacts.map((c) => (
            <div className="list-item" key={c._id}>
              <div>
                <div style={{ fontWeight: 750 }}>{c.name}</div>
                <div className="muted" style={{ fontSize: 13 }}>
                  {c.email}
                </div>
                <div className="muted" style={{ fontSize: 13 }}>
                  {c.phone}
                </div>
              </div>
              <div className="pill">{c.type}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
