/**
 * components/Hero.jsx
 * Hero a pantalla completa estilo Tesla.
 * Fondo: video (si PERSONAL_INFO.heroVideo existe) o un slideshow cinematográfico
 * con las capturas de los proyectos (efecto Ken Burns + crossfade).
 * El contenido hace parallax y se desvanece al hacer scroll.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { PERSONAL_INFO, PROJECTS } from '@/data/portfolio'
import styles from './Hero.module.css'

const SLIDE_MS = 6000
const SLIDES = PROJECTS.filter((p) => p.image).map((p) => p.image)
const [firstName, ...rest] = PERSONAL_INFO.shortName.split(' ')
const lastName = rest.join(' ')

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

function HeroBackground() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (PERSONAL_INFO.heroVideo || SLIDES.length < 2 || reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  if (PERSONAL_INFO.heroVideo) {
    return (
      <video
        className={styles.media}
        src={PERSONAL_INFO.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    )
  }

  return (
    <AnimatePresence initial={false}>
      {SLIDES.length > 0 && (
        <motion.img
          key={SLIDES[index]}
          src={SLIDES[index]}
          alt=""
          aria-hidden="true"
          className={styles.media}
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: 'easeInOut' },
            scale: { duration: (SLIDE_MS + 1600) / 1000, ease: 'linear' },
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  const scrollTo = (selector) => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={ref} className={styles.hero} aria-label="Presentación">
      <motion.div className={styles.background} style={{ scale: bgScale }} aria-hidden="true">
        <HeroBackground />
        <div className={styles.aurora} />
        <div className={styles.overlay} />
        <div className={styles.grain} />
      </motion.div>

      <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
        <div className={styles.top}>
          <motion.span className={styles.badge} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className={styles.dot} aria-hidden="true" />
            Disponible para nuevos proyectos
          </motion.span>

          <motion.h1 className={styles.title} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {firstName} <span className="text-gradient">{lastName}</span>
          </motion.h1>

          <motion.p className={styles.role} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            {PERSONAL_INFO.role}
          </motion.p>

          <motion.p className={styles.tagline} variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            {PERSONAL_INFO.tagline}
          </motion.p>
        </div>

        <motion.div className={styles.actions} variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <button className="btn btn-light" onClick={() => scrollTo('#projects')}>
            Ver proyectos
          </button>
          <button className="btn btn-dark" onClick={() => scrollTo('#contact')}>
            Contáctame
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.scrollHint}
        onClick={() => scrollTo('#about')}
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.button>
    </section>
  )
}
