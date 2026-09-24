"use client"

import { FormEvent, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type AuthFormProps = {
  onAuthenticated: () => void
}

type Mode = "login" | "signup"

export default function AuthForm({ onAuthenticated }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>("login")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    const supabase = createClient()

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
          emailRedirectTo: window.location.origin,
        },
      })

      setIsSubmitting(false)

      if (error) {
        setMessage(error.message)
        return
      }

      if (!data.session) {
        setMessage("Revisa tu correo para confirmar la cuenta.")
        return
      }

      onAuthenticated()
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsSubmitting(false)

    if (error) {
      setMessage("El correo o la contraseña no son correctos.")
      return
    }

    onAuthenticated()
  }

  return (
    <main className="flex min-h-screen items-center bg-background px-5 py-8">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm">
        <div className="text-center">
          <p className="text-2xl text-pink-400">♡</p>

          <h1 className="mt-2 text-3xl font-bold text-text">
            MiiN Commission
          </h1>

          <p className="mt-2 text-sm text-text-soft">
            Gestiona tus ventas y comisiones
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-2xl bg-pink-50 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login")
              setMessage("")
            }}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-surface text-text shadow-sm"
                : "text-text-soft"
            }`}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup")
              setMessage("")
            }}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-surface text-text shadow-sm"
                : "text-text-soft"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <label
                htmlFor="display-name"
                className="text-sm font-medium text-text-soft"
              >
                Nombre
              </label>

              <input
                id="display-name"
                type="text"
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-text-soft">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-soft"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {message && (
            <p className="text-center text-sm text-text-soft" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Un momento..."
              : mode === "login"
                ? "Entrar"
                : "Crear cuenta"}
          </button>
        </form>
      </section>
    </main>
  )
}