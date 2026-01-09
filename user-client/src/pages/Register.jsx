import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import '../styles/Register.css'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const navigate = useNavigate()

  const strength = (p) =>
    [/.{8,}/, /[A-Z]/, /\d/, /\W/].filter(r => r.test(p)).length

  const submit = async () => {
    const res = await registerUser(form)
    if (res.message === 'User created') navigate('/')
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join us in less than a minute</p>

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
