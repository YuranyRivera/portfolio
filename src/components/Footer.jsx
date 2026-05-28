/**
 * components/Footer.jsx
 */
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <span className={styles.logo} aria-label="Logo Sofia Rivera">
          <span className={styles.bracket}>&lt;</span>YR<span className={styles.bracket}>/&gt;</span>
        </span>
        <p className={styles.copy}>
          © {year} {PERSONAL_INFO.shortName} · Diseñado y construido con React & ❤️
        </p>
      </div>
    </footer>
  )
}
