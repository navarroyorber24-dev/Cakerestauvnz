'use client'

import { useState } from 'react'
import {
  Bell,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react'

const activities = [
  { title: 'Nuevo cliente registrado', detail: 'María González · hace 12 min', icon: Users },
  { title: 'Factura #1048 pagada', detail: 'Consultoría mensual · hace 38 min', icon: CircleDollarSign },
  { title: 'Cita confirmada', detail: 'Carlos Ruiz · mañana, 10:30', icon: CalendarDays },
]

export function BusinessDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ClipboardList size={19} strokeWidth={2.4} />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight">Nexo</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Notificaciones">
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">MG</div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className={`${menuOpen ? 'flex' : 'hidden'} fixed inset-x-0 top-16 z-20 h-[calc(100vh-4rem)] flex-col border-r border-border bg-background p-4 md:sticky md:top-16 md:flex md:h-[calc(100vh-4rem)] md:w-60 md:shrink-0 lg:p-5`}>
          <nav className="flex flex-col gap-1" aria-label="Navegación principal">
            <NavItem icon={LayoutDashboard} label="Resumen" active />
            <NavItem icon={Users} label="Clientes" />
            <NavItem icon={CalendarDays} label="Agenda" />
            <NavItem icon={CircleDollarSign} label="Facturación" />
            <NavItem icon={Settings} label="Configuración" />
          </nav>
          <div className="mt-auto rounded-2xl bg-secondary p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan actual</p>
            <p className="mt-2 text-sm font-semibold">Nexo Pro</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Tu suscripción se renueva el 14 de septiembre.</p>
            <button type="button" className="mt-3 text-xs font-semibold text-primary hover:underline">Administrar plan</button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Martes, 26 de agosto de 2026</p>
              <h1 className="mt-2 text-balance font-sans text-3xl font-bold tracking-tight sm:text-4xl">Buenos días, María.</h1>
              <p className="mt-2 max-w-xl text-pretty text-sm leading-6 text-muted-foreground">Aquí tienes una vista clara de lo que ocurre en tu negocio hoy.</p>
            </div>
            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              <Plus size={17} /> Nuevo registro
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Ingresos del mes" value="$24,680" change="+12.8%" positive icon={CircleDollarSign} />
            <Stat label="Clientes activos" value="184" change="+8 nuevos" icon={Users} />
            <Stat label="Citas esta semana" value="32" change="6 pendientes" icon={CalendarDays} />
            <Stat label="Tareas abiertas" value="14" change="3 vencen hoy" icon={ClipboardList} />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div><h2 className="font-sans text-lg font-semibold">Actividad reciente</h2><p className="mt-1 text-sm text-muted-foreground">Los últimos movimientos de tu equipo</p></div>
                <button type="button" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:flex">Ver todo <ChevronRight size={16} /></button>
              </div>
              <div className="mt-5 divide-y divide-border">
                {activities.map(({ title, detail, icon: Icon }) => <div className="flex items-center gap-3 py-4 first:pt-0 last:pb-0" key={title}><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Icon size={18} /></div><div className="min-w-0"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p></div><ChevronRight className="ml-auto shrink-0 text-muted-foreground" size={16} /></div>)}
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground shadow-sm sm:p-6">
              <div className="flex items-start justify-between"><div><p className="text-sm font-medium opacity-75">Próxima cita</p><h2 className="mt-2 font-sans text-2xl font-bold">Reunión de equipo</h2></div><CalendarDays size={22} className="opacity-80" /></div>
              <div className="mt-8 border-t border-primary-foreground/20 pt-4"><p className="text-sm font-semibold">Miércoles, 27 de agosto</p><p className="mt-1 text-sm opacity-75">10:30 – 11:30 · Sala principal</p></div>
              <button type="button" className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary-foreground/10 py-3 text-sm font-semibold transition hover:bg-primary-foreground/20">Ver agenda <ChevronRight size={16} className="ml-1" /></button>
            </section>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm"><Search size={18} className="text-muted-foreground" /><input aria-label="Buscar en Nexo" placeholder="Buscar clientes, facturas o tareas..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><kbd className="hidden rounded-md border border-border px-2 py-1 text-xs text-muted-foreground sm:block">⌘ K</kbd></div>
        </section>
      </div>
    </main>
  )
}

function NavItem({ icon: Icon, label, active = false }: { icon: typeof LayoutDashboard; label: string; active?: boolean }) {
  return <button type="button" className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon size={18} />{label}</button>
}

function Stat({ label, value, change, positive, icon: Icon }: { label: string; value: string; change: string; positive?: boolean; icon: typeof Users }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon size={18} className="text-primary" /></div><p className="mt-4 font-sans text-2xl font-bold tracking-tight">{value}</p><p className={`mt-2 text-xs font-semibold ${positive ? 'text-accent' : 'text-muted-foreground'}`}>{change}</p></div>
}

export default BusinessDashboard
