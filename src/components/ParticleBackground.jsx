/**
 * components/ParticleBackground.jsx
 * Fondo nebulosa galáctica — Canvas puro, sin dependencias externas.
 * Partículas moradas flotantes con líneas de conexión y glow central animado.
 *
 * Buenas prácticas aplicadas:
 *  - useRef para el canvas (sin re-renders)
 *  - useEffect con cleanup para cancelar el animationFrame al desmontar
 *  - ResizeObserver para ajustar el canvas al tamaño real del contenedor
 *  - memo para evitar re-renders innecesarios desde el padre
 */
import { useEffect, useRef, memo } from 'react'

/* ── Configuración centralizada ─────────────────────────────────────── */
const CONFIG = {
  particleCount:    130,
  maxLinkDistance:  110,
  speed:            0.35,
  colors:           ['#7c3aed', '#8b5cf6', '#a78bfa', '#6d28d9', '#c4b5fd', '#ede9fe'],
  linkOpacity:      0.18,
  glowOpacity:      0.13,
  bgFade:           'rgba(3, 0, 12, 0.22)',   // cuánto se borra el rastro por frame
}

/* ── Fábrica de partícula ────────────────────────────────────────────── */
function createParticle(W, H) {
  return {
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.9 + 0.4,
    vx:    (Math.random() - 0.5) * CONFIG.speed,
    vy:    (Math.random() - 0.5) * CONFIG.speed,
    alpha: Math.random() * 0.65 + 0.15,
    phase: Math.random() * Math.PI * 2,
    color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
  }
}

/* ── Componente ─────────────────────────────────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx    = canvas.getContext('2d')
    let rafId    = null
    let tick     = 0
    let particles = []

    /* Inicializa / re-inicializa partículas al tamaño actual */
    function init() {
      const W = canvas.width
      const H = canvas.height
      particles = Array.from({ length: CONFIG.particleCount }, () => createParticle(W, H))
    }

    /* Ajusta el canvas al tamaño real del contenedor */
    function setSize() {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width  = width  * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      init()
    }

    /* Loop de animación */
    function draw() {
      const W = canvas.width  / window.devicePixelRatio
      const H = canvas.height / window.devicePixelRatio

      /* Fade del fondo — crea el efecto de estela */
      ctx.fillStyle = CONFIG.bgFade
      ctx.fillRect(0, 0, W, H)

      /* Glow central animado (nebulosa) */
      const cx = W * 0.5 + Math.sin(tick * 0.008) * W * 0.12
      const cy = H * 0.5 + Math.cos(tick * 0.006) * H * 0.09
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.65)
      glow.addColorStop(0, `rgba(90, 20, 180, ${CONFIG.glowOpacity})`)
      glow.addColorStop(0.5, `rgba(60, 10, 120, ${CONFIG.glowOpacity * 0.5})`)
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      /* Segundo glow desplazado — más profundidad */
      const cx2 = W * 0.3 + Math.sin(tick * 0.005 + 2) * W * 0.08
      const cy2 = H * 0.6 + Math.cos(tick * 0.007 + 1) * H * 0.07
      const glow2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, H * 0.4)
      glow2.addColorStop(0, `rgba(50, 0, 140, ${CONFIG.glowOpacity * 0.7})`)
      glow2.addColorStop(1, 'transparent')
      ctx.fillStyle = glow2
      ctx.fillRect(0, 0, W, H)

      /* Partículas + conexiones */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        /* Movimiento */
        p.x     += p.vx
        p.y     += p.vy
        p.phase += 0.012

        /* Rebote en bordes */
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        /* Líneas de conexión */
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)

          if (d < CONFIG.maxLinkDistance) {
            const linkAlpha = (1 - d / CONFIG.maxLinkDistance) * CONFIG.linkOpacity
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${linkAlpha})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }

        /* Punto de la partícula con pulso de opacidad */
        const pulseAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (0.85 + 0.15 * Math.sin(p.phase)), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = pulseAlpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      tick++
      rafId = requestAnimationFrame(draw)
    }

    /* ResizeObserver — reacciona a cambios de tamaño del contenedor */
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId)
      setSize()
      rafId = requestAnimationFrame(draw)
    })

    observer.observe(canvas)
    setSize()
    rafId = requestAnimationFrame(draw)

    /* Cleanup al desmontar el componente */
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
      position: 'fixed',
        inset:    0,
        width:    '100%',
        height:   '100%',
        zIndex:   0,
      }}
    />
  )
}

export default memo(ParticleBackground)
