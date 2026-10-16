/**
 * components/Navbar.jsx
 * Barra fija estilo Tesla: transparente sobre el hero, con desenfoque al hacer scroll
 * y un panel lateral (drawer) para el menú.
 */
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, PERSONAL_INFO } from '@/data/portfolio'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Detecta qué sección está en pantalla */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    /* Las secciones se cargan de forma diferida: observa también las que aparezcan después */
    const observeAll = () => document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    observeAll()
    const mutation = new MutationObserver(observeAll)
    mutation.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])

  /* Cambia el estilo del nav al hacer scroll */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Bloquea el scroll del body y permite cerrar con Escape mientras el drawer está abierto */
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
          aria-label="Ir al inicio"
        >
          {PERSONAL_INFO.shortName.split(' ')[0]}
          <span className={styles.logoAccent}>.</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1)
            return (
              <li key={href}>
                <button
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  onClick={() => handleNavClick(href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className={styles.pill}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkLabel}>{label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className={styles.right}>
          <a href={`mailto:${PERSONAL_INFO.email}`} className={styles.cta}>
            Hablemos
          </a>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            Menú
          </button>
        </div>
      </nav>

      {/* Drawer lateral */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
            >
              <button className={styles.close} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <ul role="list" className={styles.drawerList}>
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  >
                    <button
                      className={`${styles.drawerLink} ${activeSection === href.slice(1) ? styles.drawerActive : ''}`}
                      onClick={() => handleNavClick(href)}
                    >
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className={styles.drawerFooter}>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
