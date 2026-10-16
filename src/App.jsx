/**
 * App.jsx
 * Componente raíz. Ensambla todas las secciones.
 * Lazy loading para mejorar el rendimiento inicial.
 */
import { lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero   from '@/components/Hero'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
// Carga diferida de secciones que no son visibles al inicio
const About    = lazy(() => import('@/components/About'))
const Skills   = lazy(() => import('@/components/Skills'))
const Showcase = lazy(() => import('@/components/Showcase'))
const Projects = lazy(() => import('@/components/Projects'))
const Contact  = lazy(() => import('@/components/Contact'))

// Skeleton simple mientras carga
function SectionFallback() {
  return <div style={{ minHeight: '400px' }} aria-hidden="true" />
}

// Barra de progreso de lectura en la parte superior
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0 50%',
        background: 'var(--gradient-accent)',
        zIndex: 200,
      }}
    />
  )
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Showcase />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </>
  )
}
