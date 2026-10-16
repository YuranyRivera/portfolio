/**
 * components/Journey.jsx
 * Trayectoria: línea de tiempo vertical que se "llena" al hacer scroll.
 * Cada hito muestra su etapa, descripción y el stack con logos.
 * Los datos se editan en JOURNEY dentro de src/data/portfolio.js
 */
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { JOURNEY } from '@/data/portfolio'
import { getTool } from '@/utils/techIcons'
import styles from './Journey.module.css'

function StackChip({ name }) {
  const tool = getTool(name)
  return (
    <li className={styles.chip} style={tool ? { '--brand': tool.color } : undefined}>
      {tool && <tool.Icon className={styles.chipIcon} aria-hidden="true" />}
      {name}
    </li>
  )
}

export default function Journey() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (!JOURNEY?.length) return null

  return (
    <section id="journey" className={styles.section} aria-labelledby="journey-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Trayectoria</span>
          <h2 id="journey-heading" className={styles.heading}>
            Mi camino en el <span className="text-gradient">desarrollo</span>
          </h2>
          <p className={styles.lead}>
            De mis primeros proyectos en el SENA a construir aplicaciones web y móviles hoy.
          </p>
        </motion.div>

        <div ref={listRef} className={styles.timeline}>
          {/* Línea base y línea de progreso */}
          <div className={styles.track} aria-hidden="true" />
          <motion.div className={styles.fill} style={{ scaleY: progress }} aria-hidden="true" />

          <ol className={styles.list}>
            {JOURNEY.map((step, i) => (
              <motion.li
                key={step.title}
                className={`${styles.item} ${i % 2 ? styles.right : styles.left}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={`${styles.node} ${step.current ? styles.nodeCurrent : ''}`} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <article className={`${styles.card} ${step.current ? styles.cardCurrent : ''}`}>
                  <span className={`${styles.label} ${step.current ? styles.labelCurrent : ''}`}>
                    {step.current && <span className={styles.pulse} aria-hidden="true" />}
                    {step.label}
                  </span>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.text}>{step.description}</p>
                  {step.stack?.length > 0 && (
                    <ul className={styles.stack} role="list" aria-label="Tecnologías">
                      {step.stack.map((name) => <StackChip key={name} name={name} />)}
                    </ul>
                  )}
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
