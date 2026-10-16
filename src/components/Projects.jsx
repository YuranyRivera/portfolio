/**
 * components/Projects.jsx
 * Carrusel de proyectos a pantalla completa estilo Tesla.
 *  - Autoplay con barra de progreso (se pausa al pasar el mouse o con la pestaña oculta)
 *  - Flechas, indicadores, teclado (← →) y swipe/drag en móvil
 * Los datos se editan en src/data/portfolio.js
 */
import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import styles from './Projects.module.css'

const AUTOPLAY_MS = 7000
const SWIPE_THRESHOLD = 80

const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? '8%' : '-8%' }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? '-8%' : '8%' }),
}

const pad = (n) => String(n).padStart(2, '0')

function Arrow({ direction, onClick }) {
  return (
    <button
      className={`${styles.arrow} ${direction === 'prev' ? styles.prev : styles.next}`}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Proyecto anterior' : 'Proyecto siguiente'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d={direction === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
      </svg>
    </button>
  )
}

function Slide({ project, index, total }) {
  const { title, description, tags, liveUrl, repoUrl, image, category } = project

  return (
    <div className={styles.slideInner}>
      {/* Fondo desenfocado de la propia captura */}
      {image && <img src={image} alt="" aria-hidden="true" className={styles.backdrop} />}
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.info}>
          <span className={styles.counter}>
            {pad(index + 1)} <span className={styles.counterTotal}>/ {pad(total)}</span>
          </span>
          {category && <span className="eyebrow">{category}</span>}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>

          <ul className={styles.tags} role="list" aria-label="Tecnologías">
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Ver demo en vivo
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Ver código
              </a>
            )}
          </div>
        </div>

        {image && (
          <motion.a
            href={liveUrl || repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.device}
            aria-label={`Abrir ${title}`}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            <div className={styles.browserBar} aria-hidden="true">
              <span /><span /><span />
              <div className={styles.url}>{(liveUrl || '').replace(/^https?:\/\//, '')}</div>
            </div>
            <div className={styles.screen}>
              <img src={image} alt={`Captura de pantalla de ${title}`} loading="lazy" />
            </div>
          </motion.a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const reduceMotion = useReducedMotion()
  const [[index, direction], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const total = PROJECTS.length

  const go = useCallback(
    (dir) => setState(([i]) => [(i + dir + total) % total, dir]),
    [total]
  )
  const goTo = (i) => setState(([current]) => [i, i > current ? 1 : -1])

  /* Autoplay */
  useEffect(() => {
    if (paused || reduceMotion || total < 2) return
    const id = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [index, paused, reduceMotion, total, go])

  /* Pausa cuando la pestaña no está visible */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Proyectos</span>
          <h2 id="projects-heading" className={styles.heading}>Lo que he <span className="text-gradient">construido</span></h2>
        </motion.div>
      </div>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos destacados"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={PROJECTS[index].id}
            className={styles.slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -SWIPE_THRESHOLD) go(1)
              else if (offset.x > SWIPE_THRESHOLD) go(-1)
            }}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${total}`}
          >
            <Slide project={PROJECTS[index]} index={index} total={total} />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <Arrow direction="prev" onClick={() => go(-1)} />
            <Arrow direction="next" onClick={() => go(1)} />

            <div className={styles.dots}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir al proyecto ${p.title}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className={styles.dotFill}
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: paused || reduceMotion ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
