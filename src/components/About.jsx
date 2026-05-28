/**
 * components/About.jsx
 * Sección "Sobre mí" con animación de entrada al scroll.
 */
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './About.module.css'

const variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function About() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <span className={styles.label} aria-hidden="true">01 · sobre mí</span>
          <h2 id="about-heading" className={styles.heading}>
            Código con propósito,<br />
            <span className={styles.accent}>diseño con intención.</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.bio}
            variants={variants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            transition={{ delay: 0.15 }}
          >
            <p>{PERSONAL_INFO.bio}</p>
            <p className={styles.bioParagraph}>
              Me entusiasma cada detalle: desde la arquitectura de un componente hasta
              la micro-interacción que hace sonreír al usuario. Siempre aprendiendo,
              siempre construyendo.
            </p>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className={styles.emailLink}
              aria-label="Enviar email a Yurany"
            >
              {PERSONAL_INFO.email}
              <span aria-hidden="true"> ↗</span>
            </a>
          </motion.div>

          <motion.div
            className={styles.facts}
            variants={variants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            transition={{ delay: 0.25 }}
          >
            {FACTS.map(({ label, value }) => (
              <div key={label} className={styles.factCard}>
                <span className={styles.factValue}>{value}</span>
                <span className={styles.factLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const FACTS = [
  { value: '📍', label: 'Colombia' },
  { value: 'React', label: 'Stack principal' },
  { value: 'a11y', label: 'Accesibilidad' },
  { value: 'Open', label: 'A colaboraciones' },
]
