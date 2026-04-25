import { ImageResponse } from 'next/og'
import { PROJECTS } from "@/constants"

export const alt = 'Work — M UMAIR KHAN'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return new ImageResponse(
      (
        <div style={{ background: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          Work — M UMAIR KHAN
        </div>
      )
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          color: '#fff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 40, opacity: 0.5, letterSpacing: '0.4em' }}>SELECTED WORK / M UMAIR KHAN</div>
        <div style={{ fontSize: 80, fontWeight: 'bold', maxWidth: '900px', lineHeight: 1.1, marginBottom: 40, textTransform: 'uppercase' }}>{project.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: 20, opacity: 0.7 }}>{project.category}</div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff', opacity: 0.3 }} />
          <div style={{ fontSize: 20, opacity: 0.7 }}>{project.year}</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
