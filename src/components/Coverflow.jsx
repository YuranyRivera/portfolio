/**
 * components/Coverflow.jsx
 * Carrusel 3D de imágenes: la imagen activa al centro y las vecinas más pequeñas
 * detrás, a los lados. Autoplay (se pausa al pasar el mouse), clic en una lateral
 * para traerla al frente, swipe en móvil y clic en la central para verla en grande.
 */
import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './Coverflow.module.css'

const AUTOPLAY_MS = 3800
const SWIPE_THRESHOLD = 50

/* Posición visual de cada imagen según su distancia a la activa */
function layoutFor(offset) {
  const abs = Math.abs(offset)
  if (abs === 0) return { x: '0%', scale: 1, opacity: 1, zIndex: 3, filter: 'brightness(1)' }
  if (abs === 1) return { x: `${offset * 30}%`, scale: 0.78, opacity: 1, zIndex: 2, filter: 'brightness(0.55)' }
  if (abs === 2) return { x: `${Math.sign(offset) * 48}%`, scale: 0.6, opacity: 0, zIndex: 1, filter: 'brightness(0.35)' }
  return { x: `${Math.sign(offset) * 55}%`, scale: 0.45, opacity: 0, zIndex: 0, filter: 'brightness(0.3)' }
}

export default function Coverflow({ images, title }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [zoomed, setZoomed] = useState(null)
  const total = images.length

  const go = useCallback((dir) => setActive((i) => (i + dir + total) % total), [total])

  useEffect(() => {
    if (paused || zoomed !== null || reduceMotion || total < 2) return
    const id = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, zoomed, reduceMotion, total, go])

  useEffect(() => {
    if (zoomed === null) return
    const onKey = (e) => e.key === 'Escape' && setZoomed(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className={styles.stage}
        onPanEnd={(_, { offset }) => {
          if (offset.x < -SWIPE_THRESHOLD) go(1)
          else if (offset.x > SWIPE_THRESHOLD) go(-1)
        }}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Capturas de ${title}`}
      >
        {images.map((img, i) => {
          /* Distancia circular a la imagen activa */
          let offset = i - active
          if (offset > total / 2) offset -= total
          if (offset < -total / 2) offset += total
          const isActive = offset === 0

          return (
            <motion.button
              key={img.src}
              className={styles.card}
              initial={false}
              animate={layoutFor(offset)}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => (isActive ? setZoomed(i) : setActive(i))}
              aria-label={isActive ? `Ampliar: ${img.alt}` : `Ver: ${img.alt}`}
              tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
            >
              <img src={img.src} alt={img.alt} loading="lazy" draggable="false" />
            </motion.button>
          )
        })}
      </motion.div>

      {total > 1 && (
        <div className={styles.controls}>
          <button className={styles.arrow} onClick={() => go(-1)} aria-label="Imagen anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div className={styles.dots}>
            {images.map((img, i) => (
              <button
                key={img.src}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
          <button className={styles.arrow} onClick={() => go(1)} aria-label="Imagen siguiente">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}

      <p className={styles.caption} aria-live="polite">{images[active].alt}</p>

      {/* Vista ampliada */}
      <AnimatePresence>
        {zoomed !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(null)}
            role="dialog"
            aria-modal="true"
            aria-label={images[zoomed].alt}
          >
            <motion.img
              src={images[zoomed].src}
              alt={images[zoomed].alt}
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <button className={styles.close} aria-label="Cerrar">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
