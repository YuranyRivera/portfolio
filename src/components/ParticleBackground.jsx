/**
 * components/ParticleBackground.jsx
 * Fondo de constelación nítido — Canvas puro, sin dependencias externas.
 * Puntos fucsia/lila que flotan y se conectan con líneas finas; el cursor
 * atrae conexiones y aparta ligeramente las partículas cercanas.
 *
 * Buenas prácticas aplicadas:
 *  - Se limpia el canvas en cada frame (sin estelas ni desenfoque)
 *  - Cantidad de partículas proporcional al área, con tope
 *  - Pausa cuando la pestaña está oculta; dibujo estático con reduced-motion
 *  - Cleanup de listeners y animationFrame al desmontar
 */
import { useEffect, useRef, memo } from 'react'

/* ── Configuración centralizada ─────────────────────────────────────── */
const CONFIG = {
  density:         1 / 11000,   // partículas por px²
  maxParticles:    140,
  maxLinkDistance: 130,
  mouseRadius:     170,
  speed:           0.28,
  colors:          ['#e879f9', '#d946ef', '#c084fc', '#f5d0fe', '#ffffff'],
  linkColor:       '217, 70, 239',
  linkOpacity:     0.22,
}

/* ── Fábrica de partícula ────────────────────────────────────────────── */
function createParticle(W, H) {
  return {
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.4 + 0.6,
    vx:    (Math.random() - 0.5) * CONFIG.speed,
    vy:    (Math.random() - 0.5) * CONFIG.speed,
    alpha: Math.random() * 0.5 + 0.5,
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

    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let rafId = null
    let particles = []
    let W = 0
    let H = 0

    /* Ajusta el canvas a la ventana y regenera partículas */
    function setSize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(CONFIG.maxParticles, Math.round(W * H * CONFIG.density))
      particles = Array.from({ length: count }, () => createParticle(W, H))
    }

    function step() {
      for (const p of particles) {
        /* Repulsión suave del cursor */
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 90 * 90 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          p.x += (dx / d) * 0.6
          p.y += (dy / d) * 0.6
        }

        p.x += p.vx
        p.y += p.vy
        p.phase += 0.02
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.lineWidth = 0.7

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        /* Líneas entre partículas cercanas */
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONFIG.maxLinkDistance) {
            ctx.strokeStyle = `rgba(${CONFIG.linkColor}, ${(1 - d / CONFIG.maxLinkDistance) * CONFIG.linkOpacity})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        /* Líneas hacia el cursor */
        const mx = p.x - mouse.x
        const my = p.y - mouse.y
        const md = Math.sqrt(mx * mx + my * my)
        if (md < CONFIG.mouseRadius) {
          ctx.strokeStyle = `rgba(245, 208, 254, ${(1 - md / CONFIG.mouseRadius) * 0.45})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      /* Puntos con un leve parpadeo */
      for (const p of particles) {
        ctx.globalAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.phase))
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function loop() {
      step()
      draw()
      rafId = requestAnimationFrame(loop)
    }

    function start() {
      cancelAnimationFrame(rafId)
      if (reduceMotion) draw()
      else rafId = requestAnimationFrame(loop)
    }

    const onResize = () => { setSize(); start() }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(rafId) : start())

    setSize()
    start()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default memo(ParticleBackground)
