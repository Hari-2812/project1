import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import '../styles/Register.css'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const strength = (p) =>
    [/.{8,}/, /[A-Z]/, /\d/, /\W/].filter(r => r.test(p)).length

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Enter a valid email')
      return
    }

    if (strength(form.password) < 3) {
      setError('Password is too weak')
      return
    }

    setError('')
    const res = await registerUser(form)

    if (res.message === 'User created') {
      navigate('/')
    } else {
      setError(res.message || 'Registration failed')
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join us in less than a minute</p>

        {error && <p className="login-error">{error}</p>}

        <input
          placeholder="Full Name"
          onChange={e=>setForm({...form,name:e.target.value})}
        />
        <input
          placeholder="Email address"
          onChange={e=>setForm({...form,email:e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}
        />

        <div className="strength">
          <div className={`bar strength-${strength(form.password)}`}></div>
        </div>

        <button className="primary-btn" onClick={submit}>
          Register
        </button>

        <p className="switch">
          Already have an account?
          <span onClick={() => navigate('/')}> Login</span>
        </p>
      </div>
    </div>
  )
}
