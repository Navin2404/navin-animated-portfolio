'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const linesRef = useRef<SVGSVGElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const smoothMouse = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2

      if (linesRef.current) {
        linesRef.current.style.transform = `translate(${x * 15}px, ${y * 10}px)`
      }
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${x * 6}px, ${y * 4}px)`
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const SPACING = 90
    const RADIUS = 220
    const STRENGTH = 55
    let animId: number

    const draw = () => {
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.08
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.08

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = smoothMouse.current.x
      const my = smoothMouse.current.y

      // ---- HORIZONTAL lines — STATIC, no warp ----
      ctx.strokeStyle = 'rgba(200,200,210,0.1)'
      ctx.lineWidth = 0.6
      for (let gy = 0; gy <= canvas.height; gy += SPACING) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(canvas.width, gy)
        ctx.stroke()
      }

      // ---- VERTICAL lines — PULL towards cursor ----
      for (let gx = 0; gx <= canvas.width; gx += SPACING) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(200,200,210,0.13)'
        ctx.lineWidth = 0.7

        let started = false
        for (let gy = 0; gy <= canvas.height; gy += 3) {
          const dx = gx - mx
          const dy = gy - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          let px = gx
          let py = gy

          if (dist < RADIUS && dist > 0) {
            const force = ((RADIUS - dist) / RADIUS) * STRENGTH
            px = gx + (mx - gx) / dist * force
            py = gy + (my - gy) / dist * force
          }

          if (!started) {
            ctx.moveTo(px, py)
            started = true
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Warping Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Organic SVG curves */}
      <svg
        ref={linesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transition: 'transform 0.15s ease-out', zIndex: 1 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 950 -50 C 970 200, 1050 320, 1010 520 C 970 720, 940 800, 960 950"
          fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.45"
        />
        <path
          d="M 1010 -50 C 1030 180, 1100 340, 1070 540 C 1040 740, 1010 820, 1030 950"
          fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3"
        />
        <path
          d="M 890 -50 C 910 220, 840 400, 870 580 C 900 760, 870 840, 900 950"
          fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2"
        />
        <path
          d="M 1080 -50 C 1060 200, 1130 400, 1110 580 C 1090 760, 1100 840, 1090 950"
          fill="none" stroke="var(--text)" strokeWidth="0.4" opacity="0.1"
        />
      </svg>

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{
          paddingLeft: 'clamp(40px, 8vw, 120px)',
          paddingTop: '60px',
          zIndex: 3,
        }}
      >
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'var(--muted)',
          marginBottom: '16px',
          fontWeight: 400,
        }}>
          FULL-STACK ENGINEER & TECHNICAL WRITER
        </p>

        <div ref={nameRef} style={{ transition: 'transform 0.15s ease-out' }}>
          <h1 style={{
            fontSize: 'clamp(70px, 11vw, 170px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>
            MELVIN
          </h1>
          <h1 style={{
            fontSize: 'clamp(70px, 11vw, 170px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>
            PRINCE.
          </h1>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute flex items-center gap-4"
        style={{
          bottom: '40px',
          left: 'clamp(40px, 8vw, 120px)',
          color: 'var(--muted)',
          zIndex: 3,
        }}
      >
        <div style={{ width: '48px', height: '1px', backgroundColor: 'var(--muted)' }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.3em' }}>SCROLL TO EXPLORE</span>
      </div>
    </section>
  )
}