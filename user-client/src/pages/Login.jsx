import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { loginWithGoogle } from '../services/googleAuth'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    if (!email || !password) {
      setError('Email and password are required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address')
      return false
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    setError('')
    return true
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      const res = await loginUser({ email, password })

      if (res.token) {
        localStorage.setItem('token', res.token)
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user))
        }
        navigate('/home')
      } else {
        setError(res.message || 'Login failed')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye" onClick={() => setShow(!show)}>
              {show ? '👁️' : '🙈'}
            </span>
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
