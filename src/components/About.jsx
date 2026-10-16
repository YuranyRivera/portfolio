/**
 * components/About.jsx
 * "Sobre mí": foto con parallax, texto con revelado por scroll y cifras animadas.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { PERSONAL_INFO, PROJECTS, SKILLS } from '@/data/portfolio'
import styles from './About.module.css'

const reveal = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

const STATS = [
  { value: PROJECTS.length, suffix: '', label: 'Proyectos full-stack desplegados' },
  { value: SKILLS.reduce((n, s) => n + s.items.length, 0), suffix: '+', label: 'Tecnologías y herramientas' },
  { value: SKILLS.length, suffix: '', label: 'Áreas de especialidad' },
]

/* Número que cuenta desde 0 cuando entra en pantalla */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function About() {
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            ref={imageRef}
            className={styles.media}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={PERSONAL_INFO.avatar}
              alt={`Foto de ${PERSONAL_INFO.shortName}`}
              className={styles.avatar}
              style={{ y: imageY }}
            />
            <div className={styles.mediaCaption}>
              <span>{PERSONAL_INFO.name}</span>
              <span className={styles.mediaLocation}>{PERSONAL_INFO.location}</span>
            </div>
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

        {/* Cifras estilo ficha técnica */}
        <ul className={styles.stats} role="list">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.li
              key={label}
              className={styles.stat}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={i}
            >
              <span className={styles.statValue}>
                <Counter value={value} suffix={suffix} />
              </span>
              <span className={styles.statLabel}>{label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
