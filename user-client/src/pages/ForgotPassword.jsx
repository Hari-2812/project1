import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const send = async () => {
    await fetch('http://localhost:5000/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email })
    })
    setMsg('Reset link sent to email')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <button onClick={send}>Send</button>
        {msg}
      </div>
    </div>
  )
}
