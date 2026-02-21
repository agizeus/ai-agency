import { ImageResponse } from 'next/og'

// ============================================================================
// OG-IMAGE KONFIGURATION
// Datei: app/opengraph-image.tsx
// ============================================================================

export const runtime = 'edge'
export const alt = 'AI Agency - KI-Lösungen für Unternehmen'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image() {
  // Optional: Fonts laden
  // const inter = fetch(
  //   new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
  // ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          color: 'white',
          padding: '60px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {/* Logo/Brand */}
        <div style={{ 
          position: 'absolute', 
          top: 40, 
          left: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            AI
          </div>
          <span style={{ fontSize: 24, fontWeight: 600 }}>Agency</span>
        </div>

        {/* Haupttitel */}
        <div style={{ 
          fontSize: 72, 
          fontWeight: 800, 
          marginBottom: 20,
          textAlign: 'center',
          lineHeight: 1.1,
          background: 'linear-gradient(90deg, #fff 0%, #a78bfa 100%)',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          KI-Lösungen für
          <br />
          Ihr Unternehmen
        </div>

        {/* Untertitel */}
        <div style={{ 
          fontSize: 32, 
          color: '#a5b4fc',
          textAlign: 'center',
          maxWidth: '800px'
        }}>
          Automatisierung • Chatbots • Data Science
        </div>

        {/* URL Footer */}
        <div style={{ 
          position: 'absolute', 
          bottom: 40, 
          right: 60,
          fontSize: 20,
          color: '#6366f1'
        }}>
          www.ai-agency.de
        </div>
      </div>
    ),
    { ...size }
  )
}
