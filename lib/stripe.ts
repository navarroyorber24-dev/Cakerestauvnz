import Stripe from 'stripe'

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Stripe no está configurado')
  return new Stripe(key)
}
