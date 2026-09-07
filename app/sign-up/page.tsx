import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10"><section className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold text-primary">Nexo</p><h1 className="mt-6 text-3xl font-bold tracking-tight">Crea tu cuenta</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Empieza a organizar tu negocio con claridad.</p><div className="mt-8"><AuthForm mode="sign-up" /></div><p className="mt-6 text-center text-sm text-muted-foreground">¿Ya tienes cuenta? <Link href="/sign-in" className="font-semibold text-primary">Iniciar sesión</Link></p></section></main>
}
