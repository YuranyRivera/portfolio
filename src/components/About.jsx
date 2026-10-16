/**
 * components/About.jsx
 * "Sobre mí": retrato compacto con aro de degradado y texto con revelado por scroll.
 */
import { motion } from 'framer-motion'
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './About.module.css'

const reveal = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.portrait}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.ring} aria-hidden="true" />
          <img
            src={PERSONAL_INFO.avatar}
            alt={`Foto de ${PERSONAL_INFO.shortName}`}
            className={styles.avatar}
          />
          <span className={styles.location}>{PERSONAL_INFO.location}</span>
        </motion.div>

        <div className={styles.text}>
          <motion.span className="eyebrow" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Sobre mí
          </motion.span>
          <motion.h2
            id="about-heading"
            className={styles.heading}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            Código con propósito.<br />
            <span className="text-gradient">Diseño con intención.</span>
          </motion.h2>

          <motion.p className={styles.body} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            {PERSONAL_INFO.bio}
          </motion.p>
          <motion.p className={styles.body} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
            Tengo experiencia trabajando en equipo en proyectos reales, integrando APIs,
            construyendo componentes reutilizables y resolviendo problemas bajo metodologías
            ágiles. En constante aprendizaje y siempre lista para aportar.
          </motion.p>

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}>
            <a href={`mailto:${PERSONAL_INFO.email}`} className={styles.emailLink}>
              {PERSONAL_INFO.email}
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
