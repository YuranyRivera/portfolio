/**
 * components/Skills.jsx
 * Habilidades: carrusel infinito de herramientas con sus logos + ficha por categoría.
 */
import { motion } from 'framer-motion'
import { SKILLS, TOOLS } from '@/data/portfolio'
import { ICONS } from '@/utils/techIcons'
import styles from './Skills.module.css'

const reveal = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ToolCard({ name, icon, color }) {
  const Icon = ICONS[icon]
  return (
    <div className={styles.tool} style={{ '--brand': color }}>
      <span className={styles.toolIcon}>{Icon && <Icon aria-hidden="true" />}</span>
      <span className={styles.toolName}>{name}</span>
    </div>
  )
}

function Marquee({ items, reverse = false }) {
  /* Se duplica la lista para que el bucle sea continuo */
  return (
    <div className={styles.marquee}>
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {[...items, ...items].map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} {...tool} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const half = Math.ceil(TOOLS.length / 2)

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="eyebrow">Habilidades</span>
          <h2 id="skills-heading" className={styles.heading}>Mi stack <span className="text-gradient">tecnológico</span></h2>
          <p className={styles.subheading}>Las herramientas con las que construyo día a día.</p>
        </motion.div>
      </div>

      {/* Lista accesible; las cintas son decorativas */}
      <ul className="sr-only">
        {TOOLS.map((t) => <li key={t.name}>{t.name}</li>)}
      </ul>
      <div className={styles.marquees} aria-hidden="true">
        <Marquee items={TOOLS.slice(0, half)} />
        <Marquee items={TOOLS.slice(half)} reverse />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {SKILLS.map(({ category, items }, i) => (
            <motion.div
              key={category}
              className={styles.column}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.category}>{category}</h3>
              <ul role="list" className={styles.list}>
                {items.map((item) => (
                  <li key={item} className={styles.item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
