/**
 * components/Navbar.jsx
 * Barra de navegación fija con detección de sección activa.
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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Detecta si se hizo scroll para cambiar estilo del nav */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Cierra el menú móvil al cambiar tamaño de pantalla */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
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
          <span className={styles.logoBracket}>&lt;</span>
          YR
          <span className={styles.logoBracket}>/&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                className={`${styles.link} ${activeSection === href.slice(1) ? styles.active : ''}`}
                onClick={() => handleNavClick(href)}
                aria-current={activeSection === href.slice(1) ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className={styles.cta}
          aria-label="Contactar a Yurany por email"
        >
          Hablemos
        </a>

        {/* Burger mobile */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Menú móvil"
          >
            <ul role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    className={`${styles.mobileLink} ${activeSection === href.slice(1) ? styles.active : ''}`}
                    onClick={() => handleNavClick(href)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
