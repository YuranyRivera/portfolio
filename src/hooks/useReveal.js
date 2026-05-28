/**
 * hooks/useReveal.js
 * Hook para animaciones de entrada al hacer scroll.
 * Usa IntersectionObserver de forma declarativa.
 */
import { useInView } from 'react-intersection-observer'

/**
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - % del elemento visible para activar
 * @param {boolean} [options.triggerOnce=true] - solo anima una vez
 * @returns {{ ref, isVisible }}
 */
export function useReveal({ threshold = 0.15, triggerOnce = true } = {}) {
  const { ref, inView: isVisible } = useInView({
    threshold,
    triggerOnce,
  })

  return { ref, isVisible }
}
