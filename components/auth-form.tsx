'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    const form = new FormData(event.currentTarget)
    const result = isSignUp
      ? await authClient.signUp.email({ name: String(form.get('name')), email: String(form.get('email')), password: String(form.get('password')) })
      : await authClient.signIn.email({ email: String(form.get('email')), password: String(form.get('password')) })
    setPending(false)
    if (result.error) return setError('No pudimos completar el acceso. Revisa tus datos e inténtalo de nuevo.')
    router.push('/')
    router.refresh()
  }

  return <form onSubmit={onSubmit} className="space-y-4">
    {isSignUp && <label className="block text-sm font-medium">Nombre<input name="name" required className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label>}
    <label className="block text-sm font-medium">Correo electrónico<input name="email" type="email" required className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
    <label className="block text-sm font-medium">Contraseña<input name="password" type="password" minLength={8} required className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <button disabled={pending} className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground disabled:opacity-60">{pending ? 'Procesando…' : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}</button>
  </form>
}
