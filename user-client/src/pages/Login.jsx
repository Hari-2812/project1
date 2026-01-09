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
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        const res = await loginUser({ email, password })
        if (res.token) {
            localStorage.setItem('token', res.token)
            navigate('/home')
        } else {
            setError(res.message || 'Login failed')
        }
    }

    const googleLogin = async () => {
        try {
            const firebaseToken = await loginWithGoogle()

            const res = await fetch('http://localhost:5000/api/auth/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: firebaseToken })
            })

            const data = await res.json()

            if (data.token) {
                localStorage.setItem('token', data.token)
                navigate('/home')
            }
        } catch (err) {
            console.error(err)
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
                        onChange={e => setEmail(e.target.value)}
                    />

                    <div className="password-field">
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span
                            className="eye"
                            onClick={() => setShow(!show)}
                            title={show ? 'Hide password' : 'Show password'}
                        >
                            {show ? '👁️': '🙈'}
                        </span>
                    </div>

                    <button className="primary-btn">Login</button>
                </form>

                <p className="link" onClick={() => navigate('/forgot')}>
                    Forgot password?
                </p>

                <div className="divider">OR</div>

                <button className="google-btn" onClick={googleLogin}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                    />
                    Continue with Google
                </button>

                <p className="switch">
                    Don’t have an account?
                    <span onClick={() => navigate('/register')}> Register</span>
                </p>
            </div>
        </div>
    )
}
