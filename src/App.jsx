/**
 * App.jsx
 * Componente raíz. Ensambla todas las secciones.
 * Lazy loading para mejorar el rendimiento inicial.
 */
import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero   from '@/components/Hero'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
// Carga diferida de secciones que no son visibles al inicio
const About    = lazy(() => import('@/components/About'))
const Skills   = lazy(() => import('@/components/Skills'))
const Projects = lazy(() => import('@/components/Projects'))
const Contact  = lazy(() => import('@/components/Contact'))

// Skeleton simple mientras carga
function SectionFallback() {
  return <div style={{ minHeight: '400px' }} aria-hidden="true" />
}

export default function App() {
  return (
    <>

      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar />
      <ParticleBackground />
      <main id="main-content">
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
