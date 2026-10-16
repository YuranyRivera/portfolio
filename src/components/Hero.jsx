/**
 * components/Hero.jsx
 * Hero a pantalla completa estilo Tesla.
 * Fondo: video (si PERSONAL_INFO.heroVideo existe) u orbes de luz morada animados.
 * El contenido hace parallax y se desvanece al hacer scroll.
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Hero.module.css'

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
  if (PERSONAL_INFO.heroVideo) {
    return (
      <video
        className={styles.video}
        src={PERSONAL_INFO.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    )
  }

  /* Orbes de luz morada que flotan lentamente */
  return (
    <>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
      <div className={styles.grid} />
    </>
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
