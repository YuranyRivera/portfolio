/**
 * components/Footer.jsx
 * Pie de página minimalista estilo Tesla.
 */
import { PERSONAL_INFO } from '@/data/portfolio'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <ul className={styles.links} role="list">
        <li>{PERSONAL_INFO.shortName} © {year}</li>
        <li><a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={`mailto:${PERSONAL_INFO.email}`}>Email</a></li>
        <li>{PERSONAL_INFO.location}</li>
      </ul>
    </footer>
  )
}
