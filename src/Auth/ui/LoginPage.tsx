import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { isAuthenticated, setSession, checkCredentials } from '@/Auth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email address is required')
      return
    }
    if (!password) {
      setError('Password is required')
      return
    }

    setIsLoading(true)

    // Simulate a brief async check for realism
    setTimeout(() => {
      if (checkCredentials(email, password)) {
        setSession(email)
        navigate(from, { replace: true })
      } else {
        setError('Invalid email or password. Please try again.')
        setIsLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#11245e_0%,#050816_70%)] opacity-90" />
        <div className="absolute inset-y-0 left-1/2 w-[600px] -translate-x-1/2 bg-blue-700/10 blur-[180px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-16 py-8">
        <h1 className="text-[56px] font-extrabold tracking-tight text-[#D8D5FF]">
          Cine View
        </h1>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="
            px-10 py-3
            rounded-full
            bg-[#B8B3FF]
            text-[#232055]
            font-semibold
            hover:scale-105
            transition
          "
        >
          Sign In
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex justify-center items-center px-6">

        <div
          className="
            w-full
            max-w-[540px]
            rounded-[28px]
            border border-[#3B4261]
            bg-[#162038]/90
            px-[20px]
            py-[20px]
            shadow-[0_30px_100px_rgba(71,92,255,0.35)]
            backdrop-blur-xl
          "
        >
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-[72px] font-black text-[#BDB7FF]">
              Cine View
            </h1>

            <h2 className="mt-2 text-[42px] font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-[#B8C0D8] text-lg mt-2">
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-400/30 p-4 text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-[#D2D7EA] mb-3 font-medium">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="name@example.com"
                className="
                  w-full
                  rounded-xl
                  bg-[#060611]
                  px-6
                  py-5
                  text-lg
                  outline-none
                  border
                  border-[#2A3352]
                  focus:border-[#7D6CFF]
                "
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-[#D2D7EA] font-medium">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[#BDB7FF] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  className="
                    w-full
                    rounded-xl
                    bg-[#060611]
                    px-6
                    py-5
                    pr-16
                    text-lg
                    border
                    border-[#2A3352]
                    focus:border-[#7D6CFF]
                    outline-none
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              className="
                w-full
                rounded-full
                py-5
                text-2xl
                font-bold
                bg-gradient-to-r
                from-[#6352FF]
                to-[#5B4DFF]
                shadow-[0_10px_50px_rgba(98,82,255,0.5)]
                hover:scale-[1.02]
                transition
              "
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-5 my-10">
            <div className="flex-1 h-px bg-[#303B5B]" />
            <span className="text-[#8A92B2] uppercase tracking-[3px]">
              Or Continue With
            </span>
            <div className="flex-1 h-px bg-[#303B5B]" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-5 mb-8">
            <button className="h-[72px] rounded-xl bg-[#27273A]">
              Google
            </button>

            <button className="h-[72px] rounded-xl bg-[#27273A]">
              Apple
            </button>
          </div>

          <p className="text-center text-[#B8C0D8]">
            Don't have an account?{' '}
            <button className="text-[#BDB7FF] font-semibold">
              Sign Up
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1D2239] px-16 py-8">
        <div className="flex justify-between items-center text-[#9BA4C0]">
          <span className="text-white font-bold text-3xl">
            Cine View
          </span>

          <div className="flex gap-10">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>Help Center</button>
          </div>

          <span>© 2024 Cine View. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
