/**
 * components/Skills.jsx
 * Sección de habilidades organizadas por categoría.
 */
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { SKILLS } from '@/data/portfolio'
import styles from './Skills.module.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function Skills() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className={styles.container}>
        <div ref={ref}>
          <span className={styles.label} aria-hidden="true">02 · habilidades</span>
          <h2 id="skills-heading" className={styles.heading}>
            Mi stack tecnológico
          </h2>
          <p className={styles.subheading}>
            Las herramientas con las que construyo día a día.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {SKILLS.map(({ category, items }) => (
            <motion.div
              key={category}
              className={styles.card}
              variants={cardVariants}
            >
              <h3 className={styles.category}>{category}</h3>
              <ul className={styles.itemList} role="list">
                {items.map((item) => (
                  <li key={item} className={styles.pill}>
                    <span className={styles.pillDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
