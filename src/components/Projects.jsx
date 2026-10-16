/**
 * components/Projects.jsx
 * Cada proyecto se muestra con su información y un carrusel 3D de capturas
 * (ver Coverflow.jsx). Los bloques alternan de lado en escritorio.
 * Los datos se editan en src/data/portfolio.js
 */
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import Coverflow from './Coverflow'
import styles from './Projects.module.css'

const pad = (n) => String(n).padStart(2, '0')

const reveal = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectBlock({ project, index }) {
  const { title, description, tags, liveUrl, repoUrl, images = [], category } = project
  const reversed = index % 2 === 1

  return (
    <article className={`${styles.block} ${reversed ? styles.reversed : ''}`} aria-label={`Proyecto: ${title}`}>
      <motion.div
        className={styles.info}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.meta}>
          <span className={styles.number}>{pad(index + 1)}</span>
          {category && <span className={styles.category}>{category}</span>}
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <ul className={styles.tags} role="list" aria-label="Tecnologías">
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.primary}>
              Ver demo <span aria-hidden="true">↗</span>
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              Código
            </a>
          )}
        </div>
      </motion.div>

      {images.length > 0 && (
        <motion.div
          className={styles.gallery}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={1}
        >
          <Coverflow images={images} title={title} />
        </motion.div>
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
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

      <div className={styles.list}>
        {PROJECTS.map((project, i) => (
          <ProjectBlock key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
