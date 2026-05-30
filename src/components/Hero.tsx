'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const linesRef = useRef<SVGSVGElement>(null)
  const circle1Ref = useRef<HTMLDivElement>(null)
  const circle2Ref = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2

      if (linesRef.current) {
        linesRef.current.style.transform = `translate(${x * 20}px, ${y * 15}px)`
      }
      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translate(${x * 35}px, ${y * 30}px)`
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translate(${x * 15}px, ${y * 20}px)`
      }
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${x * 8}px, ${y * 5}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* SVG Lines */}
      <svg
        ref={linesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transition: 'transform 0.1s ease-out', opacity: 0.25 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 900 -100 C 900 200, 980 300, 950 500 C 920 700, 880 750, 920 1000"
          fill="none" stroke="var(--accent)" strokeWidth="1" />
        <path d="M 960 -100 C 940 150, 1060 350, 1020 550 C 980 750, 940 800, 970 1000"
          fill="none" stroke="var(--accent)" strokeWidth="0.8" />
        <path d="M 840 -100 C 860 250, 780 400, 820 600 C 860 800, 820 850, 860 1000"
          fill="none" stroke="var(--text)" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="300" x2="1440" y2="300" stroke="var(--text)" strokeWidth="0.3" opacity="0.1" />
        <line x1="0" y1="600" x2="1440" y2="600" stroke="var(--text)" strokeWidth="0.3" opacity="0.1" />
        <line x1="360" y1="0" x2="360" y2="900" stroke="var(--text)" strokeWidth="0.3" opacity="0.1" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="var(--text)" strokeWidth="0.3" opacity="0.1" />
        <line x1="1080" y1="0" x2="1080" y2="900" stroke="var(--text)" strokeWidth="0.3" opacity="0.1" />
      </svg>

      {/* Circle 1 */}
      <div
        ref={circle1Ref}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '52px', height: '52px',
          backgroundColor: 'var(--muted)',
          opacity: 0.55,
          top: '37%', left: '63%',
          transition: 'transform 0.15s ease-out',
        }}
      />

      {/* Circle 2 */}
      <div
        ref={circle2Ref}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '40px', height: '40px',
          backgroundColor: 'var(--muted)',
          opacity: 0.4,
          top: '67%', left: '59%',
          transition: 'transform 0.25s ease-out',
        }}
      />

      {/* Main content — vertically centered */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: 'clamp(40px, 8vw, 120px)', paddingTop: '80px' }}
      >
        {/* Subtitle */}
        <p
          className="mb-4"
          style={{
            fontSize: '11px',
            letterSpacing: '0.4em',
            color: 'var(--muted)',
            fontWeight: 400,
          }}
        >
          FULL-STACK ENGINEER & AI ENGINEER
        </p>

        {/* Name with parallax */}
        <div ref={nameRef} style={{ transition: 'transform 0.12s ease-out' }}>
          <h1
            style={{
              fontSize: 'clamp(80px, 13vw, 190px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              textTransform: 'uppercase',
            }}
          >
            Navin
          </h1>
          <h1
            style={{
              fontSize: 'clamp(60px, 10vw, 150px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
            }}
          >
            WALKER.
          </h1>
        </div>
      </div>

      {/* Scroll hint — bottom left */}
      <div
        className="absolute flex items-center gap-4"
        style={{
          bottom: '40px',
          left: 'clamp(40px, 8vw, 120px)',
          color: 'var(--muted)',
        }}
      >
        <div style={{ width: '48px', height: '1px', backgroundColor: 'var(--muted)' }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.3em' }}>SCROLL TO EXPLORE</span>
      </div>
    </section>
  )
}