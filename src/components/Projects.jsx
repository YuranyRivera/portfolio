/**
 * components/Projects.jsx
 * Sección de proyectos con cards animadas.
 * Los datos se editan en src/data/portfolio.js
 */
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { PROJECTS } from '@/data/portfolio'
import styles from './Projects.module.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, repoUrl, featured } = project

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      variants={cardVariants}
      aria-label={`Proyecto: ${title}`}
    >
      {featured && (
        <span className={styles.featuredBadge}>Destacado</span>
      )}

      <div className={styles.cardHeader}>
        <span className={styles.folderIcon} aria-hidden="true">⬡</span>
        <div className={styles.cardLinks}>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositorio de ${title}`}
              className={styles.iconLink}
            >
              {/* GitHub icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demo en vivo de ${title}`}
              className={styles.iconLink}
            >
              {/* External link icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <footer className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </footer>
    </motion.article>
  )
}

export default function Projects() {
  const { ref, isVisible } = useReveal()

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <div ref={ref}>
          <span className={styles.label} aria-hidden="true">03 · proyectos</span>
          <h2 id="projects-heading" className={styles.heading}>
            Lo que he construido
          </h2>
          <p className={styles.subheading}>
            Una selección de proyectos que reflejan mi forma de pensar y programar.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
