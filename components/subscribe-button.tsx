'use client'

import { useState } from 'react'

export function SubscribeButton() {
  const [pending, setPending] = useState(false)
  async function subscribe() {
    setPending(true)
    const response = await fetch('/api/billing/checkout', { method: 'POST' })
    const data = await response.json()
    if (data.url) window.location.href = data.url
    setPending(false)
  }
  return <button type="button" onClick={subscribe} disabled={pending} className="mt-3 text-xs font-semibold text-primary hover:underline disabled:opacity-60">{pending ? 'Abriendo checkout…' : 'Administrar plan'}</button>
}
