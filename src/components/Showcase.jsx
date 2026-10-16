/**
 * components/Showcase.jsx
 * Galería destacada: un carrusel 3D (Coverflow) con las capturas de todos los
 * proyectos, intercaladas para alternar entre ellos. Sirve de antesala a la
 * sección de proyectos. Las imágenes salen de `images` en src/data/portfolio.js
 */
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import Coverflow from './Coverflow'
import styles from './Showcase.module.css'

/* Intercala las capturas: 1ª de cada proyecto, luego 2ª de cada uno, etc. */
const IMAGES = (() => {
  const lists = PROJECTS
    .filter((p) => p.images?.length)
    .map((p) => p.images.map((img) => ({ ...img, alt: `${p.title} · ${img.alt}` })))
  const longest = Math.max(0, ...lists.map((l) => l.length))
  const result = []
  for (let i = 0; i < longest; i++) lists.forEach((l) => l[i] && result.push(l[i]))
  return result
})()

const reveal = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Showcase() {
  if (IMAGES.length === 0) return null

  return (
    <section id="showcase" className={styles.section} aria-labelledby="showcase-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="eyebrow">Galería</span>
          <h2 id="showcase-heading" className={styles.heading}>
            Un vistazo a mi <span className="text-gradient">trabajo</span>
          </h2>
          <p className={styles.lead}>
            Pantallas reales de aplicaciones que diseñé y desarrollé de principio a fin.
            Recorre la galería y haz clic en cualquier imagen para verla en grande;
            a continuación encontrarás cada proyecto en detalle.
          </p>
        </motion.div>

        <motion.div
          className={styles.gallery}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <Coverflow images={IMAGES} title="mis proyectos" />
        </motion.div>
      </div>
    </section>
  )
}
