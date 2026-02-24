import Script from 'next/script'
import { useEffect } from 'react'

// ============================================================================
// PLAUSIBLE ANALYTICS INTEGRATION
// Option 1: Einfache Script-Einbindung
// ============================================================================

// components/PlausibleScript.tsx
export default function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  
  if (!domain) return null
  
  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  )
}

// In app/layout.tsx:
// <head><PlausibleScript /></head>

// ============================================================================
// Option 2: next-plausible Package (empfohlen)
// ============================================================================

// Install: npm install next-plausible

// app/providers.tsx
'use client'

import PlausibleProvider from 'next-plausible'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider 
      domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ''}
      // Optional: Custom Script URL für Self-Hosted
      // scriptProps={{
      //   src: 'https://analytics.deine-domain.de/js/script.js'
      // }}
      // Optional: Outbound Links tracken
      trackOutboundLinks
      // Optional: File Downloads tracken
      trackFileDownloads
    >
      {children}
    </PlausibleProvider>
  )
}

// ============================================================================
// CUSTOM EVENTS MIT PLAUSIBLE
// ============================================================================

'use client'

import { usePlausible } from 'next-plausible'

// Button mit Event Tracking
export function TrackableButton() {
  const plausible = usePlausible()
  
  return (
    <button
      onClick={() => {
        plausible('contact_click', {
          props: {
            location: 'hero',
            button_text: 'Kontakt aufnehmen'
          }
        })
      }}
    >
      Kontakt aufnehmen
    </button>
  )
}

// Form Submission Tracking
export function ContactForm() {
  const plausible = usePlausible()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    plausible('form_submit', {
      props: {
        form_name: 'contact',
        page: window.location.pathname
      }
    })
    
    // Form verarbeiten...
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}

// E-Commerce / Conversion Tracking
export function PricingButton({ plan }: { plan: string }) {
  const plausible = usePlausible()
  
  return (
    <button
      onClick={() => {
        plausible('purchase_intent', {
          props: {
            plan: plan,
            price: plan === 'pro' ? '99' : '49',
            currency: 'EUR'
          },
          revenue: { currency: 'EUR', amount: plan === 'pro' ? 99 : 49 }
        })
      }}
    >
      Jetzt buchen
    </button>
  )
}

// ============================================================================
// GOOGLE ANALYTICS 4 INTEGRATION
// ============================================================================

// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Typ-Definition für gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

// Page View
export function pageview(url: string) {
  if (!GA_TRACKING_ID) return
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// Event
interface GTagEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function gtagEvent({ action, category, label, value, ...rest }: GTagEvent) {
  if (!GA_TRACKING_ID) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest
  })
}

// Google Analytics Script Component
// components/GoogleAnalytics.tsx
'use client'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  
  if (!gaId) return null
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              send_page_view: true
            });
          `
        }}
      />
    </>
  )
}

// ============================================================================
// DSGVO-KONFORMES TRACKING (Consent Mode)
// ============================================================================

// lib/consent.ts
export const consentConfig = {
  analytics: false,
  marketing: false,
  necessary: true
}

export function updateConsent(consent: typeof consentConfig) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      functionality_storage: consent.necessary ? 'granted' : 'denied',
      personalization_storage: consent.marketing ? 'granted' : 'denied',
      security_storage: 'granted'
    })
  }
}

// Default Consent (bei Seitenladen)
export const defaultConsent = `
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });
`

// ============================================================================
// ANALYTICS HOOK (kombiniert Plausible + GA)
// ============================================================================

'use client'

import { usePlausible } from 'next-plausible'
import { gtagEvent } from '@/lib/gtag'

interface TrackEventParams {
  name: string
  props?: Record<string, any>
}

export function useAnalytics() {
  const plausible = usePlausible()
  
  const track = ({ name, props = {} }: TrackEventParams) => {
    // Plausible
    plausible(name, { props })
    
    // Google Analytics
    gtagEvent({
      action: name,
      category: props.category || 'general',
      label: props.label || name,
      ...props
    })
  }
  
  const trackPageview = (url: string) => {
    plausible('pageview', { props: { url } })
  }
  
  return { track, trackPageview }
}

// Usage:
// const { track } = useAnalytics()
// track({ name: 'signup', props: { method: 'google' } })
