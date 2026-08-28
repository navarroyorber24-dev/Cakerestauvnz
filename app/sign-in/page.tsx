import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10"><section className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold text-primary">Nexo</p><h1 className="mt-6 text-3xl font-bold tracking-tight">Bienvenida de nuevo</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Gestiona tu negocio desde un solo lugar.</p><div className="mt-8"><AuthForm mode="sign-in" /></div><p className="mt-6 text-center text-sm text-muted-foreground">¿Aún no tienes cuenta? <Link href="/sign-up" className="font-semibold text-primary">Crear cuenta</Link></p></section></main>
}
