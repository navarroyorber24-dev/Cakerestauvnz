import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Billing no configurado' }, { status: 503 })
  const origin = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price_data: { currency: 'eur', unit_amount: 1900, recurring: { interval: 'month' }, product_data: { name: 'Nexo Pro', description: 'Herramientas avanzadas para gestionar tu negocio' } }, quantity: 1 }],
    success_url: `${origin}/?billing=success`,
    cancel_url: `${origin}/?billing=cancelled`,
    integration_identifier: `nexo_billing_${Math.random().toString(36).slice(2, 10)}`,
  })
  return NextResponse.json({ url: session.url })
}
