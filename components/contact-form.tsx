"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Check, AlertCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type Fields = {
  name: string
  email: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

type Status = "idle" | "loading" | "success" | "error"

const initialFields: Fields = { name: "", email: "", subject: "", message: "" }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields: Fields): Errors {
  const errors: Errors = {}

  if (!fields.name.trim()) {
    errors.name = "Please enter your name."
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters."
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter your email."
  } else if (!emailRegex.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  if (!fields.subject.trim()) {
    errors.subject = "Please enter a subject."
  }

  if (!fields.message.trim()) {
    errors.message = "Please enter a message."
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters."
  }

  return errors
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>("idle")

  function handleChange(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (touched[key]) {
      setErrors(validate({ ...fields, [key]: value }))
    }
    if (status === "success" || status === "error") {
      setStatus("idle")
    }
  }

  function handleBlur(key: keyof Fields) {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setErrors(validate(fields))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(fields)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus("loading")

    try {
      // Simulate a network request. Replace with a real API call / server action.
      await new Promise((resolve) => setTimeout(resolve, 1600))

      // Simulate an occasional server error for demo purposes.
      if (Math.random() < 0.15) {
        throw new Error("Request failed")
      }

      setStatus("success")
      setFields(initialFields)
      setTouched({})
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Get in touch</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Have a question or want to work together? Fill out the form and we&apos;ll get back to you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <FloatingInput
            id="name"
            label="Full name"
            value={fields.name}
            error={touched.name ? errors.name : undefined}
            onChange={(v) => handleChange("name", v)}
            onBlur={() => handleBlur("name")}
            autoComplete="name"
          />

          <FloatingInput
            id="email"
            type="email"
            label="Email address"
            value={fields.email}
            error={touched.email ? errors.email : undefined}
            onChange={(v) => handleChange("email", v)}
            onBlur={() => handleBlur("email")}
            autoComplete="email"
          />

          <FloatingInput
            id="subject"
            label="Subject"
            value={fields.subject}
            error={touched.subject ? errors.subject : undefined}
            onChange={(v) => handleChange("subject", v)}
            onBlur={() => handleBlur("subject")}
          />

          <FloatingTextarea
            id="message"
            label="Message"
            value={fields.message}
            error={touched.message ? errors.message : undefined}
            onChange={(v) => handleChange("message", v)}
            onBlur={() => handleBlur("message")}
          />

          {status === "success" && (
            <Feedback variant="success" icon={<Check className="size-4" aria-hidden="true" />}>
              Thanks! Your message has been sent. We&apos;ll be in touch soon.
            </Feedback>
          )}

          {status === "error" && (
            <Feedback variant="error" icon={<AlertCircle className="size-4" aria-hidden="true" />}>
              Something went wrong while sending your message. Please try again.
            </Feedback>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6",
              "text-sm font-medium text-primary-foreground transition-colors",
              "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:cursor-not-allowed disabled:opacity-70",
            )}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Send message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

type FloatingInputProps = {
  id: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
  type?: string
  autoComplete?: string
}

function FloatingInput({ id, label, value, error, onChange, onBlur, type = "text", autoComplete }: FloatingInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "peer h-14 w-full rounded-lg border bg-background px-3.5 pt-5 pb-1.5 text-sm",
            "transition-colors placeholder:text-transparent",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
            error && "border-destructive focus:ring-destructive/40 focus:border-destructive",
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
            "transition-all duration-150",
            "peer-focus:top-3.5 peer-focus:text-xs peer-focus:font-medium",
            "peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium",
            error ? "peer-focus:text-destructive" : "peer-focus:text-foreground",
          )}
        >
          {label}
        </label>
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  )
}

type FloatingTextareaProps = {
  id: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

function FloatingTextarea({ id, label, value, error, onChange, onBlur }: FloatingTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <textarea
          id={id}
          name={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "peer w-full resize-y rounded-lg border bg-background px-3.5 pt-6 pb-2 text-sm leading-relaxed",
            "transition-colors placeholder:text-transparent",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
            error && "border-destructive focus:ring-destructive/40 focus:border-destructive",
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3.5 top-4 text-sm text-muted-foreground",
            "transition-all duration-150",
            "peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-medium",
            "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium",
            error ? "peer-focus:text-destructive" : "peer-focus:text-foreground",
          )}
        >
          {label}
        </label>
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

function Feedback({
  variant,
  icon,
  children,
}: {
  variant: "success" | "error"
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm",
        variant === "success"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "border-destructive/30 bg-destructive/10 text-destructive",
      )}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="leading-relaxed">{children}</span>
    </div>
  )
}
