/**
 * components/Hero.jsx
 * Sección principal con fondo de partículas y animaciones de entrada.
 */
import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Hero.module.css'

/* Variantes de animación centralizadas */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero} aria-label="Presentación">
      <ParticleBackground />

      {/* Glow decorativo */}
      <div className={styles.glow} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.badge} variants={itemVariants}>
          <span className={styles.dot} aria-hidden="true" />
          Disponible para proyectos
        </motion.span>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Hola, soy{' '}
          <span className={styles.name}>
            {PERSONAL_INFO.shortName}
          </span>
        </motion.h1>

        <motion.p className={styles.role} variants={itemVariants}>
          <span aria-hidden="true">{'{ '}</span>
          {PERSONAL_INFO.role}
          <span aria-hidden="true">{' }'}</span>
        </motion.p>

        <motion.p className={styles.tagline} variants={itemVariants}>
          {PERSONAL_INFO.tagline}
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <button className={styles.btnPrimary} onClick={scrollToProjects}>
            Ver proyectos
          </button>
          <button className={styles.btnSecondary} onClick={scrollToContact}>
            Contáctame
          </button>
        </motion.div>

        <motion.div className={styles.socials} variants={itemVariants}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Sofia Rivera"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <span className={styles.socialDivider} aria-hidden="true">·</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Sofia Rivera"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
