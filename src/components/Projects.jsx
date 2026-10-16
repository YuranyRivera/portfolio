/**
 * components/Projects.jsx
 * Cuadrícula de proyectos pensada para crecer (10, 30, 100…):
 *  - Muestra PAGE_SIZE proyectos y un botón "Ver más"
 *  - Cada tarjeta abre un detalle con el carrusel 3D de capturas (Coverflow)
 * Los datos se editan en src/data/portfolio.js
 */
import { forwardRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'
import { PROJECTS } from '@/data/portfolio'
import Coverflow from './Coverflow'
import styles from './Projects.module.css'

const PAGE_SIZE = 6

/* Destacados primero, luego en el orden del archivo de datos */
const SORTED = [...PROJECTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))

/* Íconos de enlace: demo en vivo y código en GitHub */
function IconLinks({ title, liveUrl, repoUrl }) {
  return (
    <div className={styles.iconLinks}>
      {repoUrl && (
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`Código de ${title} en GitHub`} title="Ver código en GitHub">
          <SiGithub aria-hidden="true" />
        </a>
      )}
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`Demo en vivo de ${title}`} title="Ver demo en vivo">
          <FiExternalLink aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

/* forwardRef: AnimatePresence (popLayout) necesita medir el elemento al salir */
const ProjectCard = forwardRef(function ProjectCard({ project, onOpen }, ref) {
  const { title, description, tags, images = [], category, liveUrl, repoUrl } = project
  const cover = images[0]
  const extraTags = tags.length - 3

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className={styles.card}>
        <div className={styles.thumb}>
          {cover ? (
            <img src={cover.src} alt="" loading="lazy" />
          ) : (
            <span className={styles.thumbFallback} aria-hidden="true">{title.charAt(0)}</span>
          )}
          {images.length > 1 && (
            <span className={styles.badge}>{images.length} capturas</span>
          )}
        </div>

        <div className={styles.cardBody}>
          {category && <span className={styles.category}>{category}</span>}
          <h3 className={styles.cardTitle}>
            {/* El botón cubre toda la tarjeta (ver .cardOpen::after); los íconos quedan por encima */}
            <button className={styles.cardOpen} onClick={() => onOpen(project)} aria-label={`Ver detalles de ${title}`}>
              {title}
            </button>
          </h3>
          <p className={styles.cardText}>{description}</p>
          <div className={styles.cardFooter}>
            <ul className={styles.tags} role="list">
              {tags.slice(0, 3).map((tag) => <li key={tag} className={styles.tag}>{tag}</li>)}
              {extraTags > 0 && <li className={styles.tagMore}>+{extraTags}</li>}
            </ul>
            <IconLinks title={title} liveUrl={liveUrl} repoUrl={repoUrl} />
          </div>
        </div>
      </article>
    </motion.li>
  )
})

function ProjectModal({ project, onClose }) {
  const { title, description, tags, liveUrl, repoUrl, images = [], category } = project

  /* Bloquea el scroll del fondo y cierra con Escape */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Cerrar" autoFocus>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {images.length > 0 && <Coverflow images={images} title={title} />}

        <div className={styles.modalInfo}>
          {category && <span className={styles.category}>{category}</span>}
          <h3 id="project-modal-title" className={styles.modalTitle}>{title}</h3>
          <p className={styles.modalText}>{description}</p>
          <ul className={styles.tags} role="list" aria-label="Tecnologías">
            {tags.map((tag) => <li key={tag} className={styles.tag}>{tag}</li>)}
          </ul>
          <div className={styles.actions}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                <FiExternalLink aria-hidden="true" />
                Ver demo
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                <SiGithub aria-hidden="true" />
                Ver código
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)

  const shown = SORTED.slice(0, visible)
  const remaining = SORTED.length - shown.length

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Proyectos</span>
          <h2 id="projects-heading" className={styles.heading}>
            Lo que he <span className="text-gradient">construido</span>
          </h2>
        </motion.div>

        <motion.ul layout className={styles.grid} role="list">
          <AnimatePresence mode="popLayout">
            {shown.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {remaining > 0 && (
          <div className={styles.more}>
            <button className={styles.moreBtn} onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Ver más proyectos ({remaining})
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
