'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const navLinks = ['HOME', 'ABOUT', 'PROJECTS', 'CONTACT']

export default function Navbar() {
  const [active, setActive] = useState('HOME')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const handleNav = (link: string) => {
    setActive(link)
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.toLowerCase()))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.toUpperCase())
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-8 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 8px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.12)',
          backgroundColor: 'rgba(28,28,28,0.9)',
          backdropFilter: 'blur(16px)',
          whiteSpace: 'nowrap',
        }}
      >
        {navLinks.map(link => (
          <button
            key={link}
            onClick={() => handleNav(link)}
            style={{
              position: 'relative',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '11px',
              letterSpacing: '0.15em',
              fontWeight: active === link ? 700 : 400,
              color: active === link ? 'var(--text)' : 'var(--muted)',
              backgroundColor: active === link ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none',
              cursor: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {link}
            {active === link && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                }}
              />
            )}
          </button>
        ))}

        <div style={{
          width: '1px',
          height: '20px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          margin: '0 4px',
        }} />

        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 12px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'var(--muted)',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </nav>
  )
}