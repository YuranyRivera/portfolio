/**
 * components/Contact.jsx
 * Sección de contacto limpia y directa.
 */
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Contact.module.css'

const variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function Contact() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <motion.div
          ref={ref}
          className={styles.inner}
          variants={variants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <span className={styles.label} aria-hidden="true">04 · contacto</span>

          <h2 id="contact-heading" className={styles.heading}>
            ¿Tienes un proyecto en mente?
          </h2>

          <p className={styles.body}>
            Estoy abierta a nuevas oportunidades, colaboraciones y conversaciones
            interesantes. No dudes en escribirme.
          </p>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className={styles.emailBtn}
            aria-label="Enviar email a Sofia Rivera"
          >
            Escribir un email
          </a>

          <div className={styles.links}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Perfil de GitHub"
            >
              GitHub ↗
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Perfil de LinkedIn"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
