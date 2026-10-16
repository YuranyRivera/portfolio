/**
 * components/Contact.jsx
 * Llamado a la acción final a pantalla completa.
 */
import { motion } from 'framer-motion'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Contact.module.css'

const reveal = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.span className="eyebrow" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Contacto
        </motion.span>

        <motion.h2
          id="contact-heading"
          className={styles.heading}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          ¿Tienes un proyecto<br /><span className="text-gradient">en mente?</span>
        </motion.h2>

        <motion.p className={styles.body} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
          Estoy abierta a nuevas oportunidades, colaboraciones y conversaciones
          interesantes. Construyamos algo juntos.
        </motion.p>

        <motion.div className={styles.actions} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn-light">
            Escribir un email
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Conectar en LinkedIn
          </a>
        </motion.div>

        <motion.a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        >
          Ver mi GitHub ↗
        </motion.a>
      </div>
    </section>
  )
}
