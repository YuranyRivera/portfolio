/**
 * data/portfolio.js
 * Fuente central de datos del portafolio.
 * Edita aquí para actualizar todo el sitio.
 */

export const PERSONAL_INFO = {
  name: 'Yurany Sofia Rivera De La Cruz',
  shortName: 'Sofia Rivera',
  role: 'Desarrolladora de Software · Frontend',
  tagline: 'Construyo interfaces que las personas disfrutan usar.',
  bio: `Desarrolladora de Software apasionada por construir interfaces que combinan funcionalidad
  y buen diseño. Me especializo en React y Next.js, y disfruto cada desafío que me acerca
  más a ser mejor en lo que hago.`,
  location: 'Colombia',
  email: 'yuranidelacruz2006@gmail.com',
  github: 'https://github.com/YuranyRivera',
  linkedin: 'https://www.linkedin.com/in/sofia-de-la-cruz-5828ba311',
  avatar: '/sofia.png',
}

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES2023)', 'HTML5 & CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend & BD',
    items: ['Node.js', 'MySQL', 'PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    category: 'Herramientas & Prácticas',
    items: ['Git & GitHub', 'Figma', 'Scrum / Kanban', 'Responsive Design', 'Accesibilidad (a11y)'],
  },
]

/**
 * Proyectos — agrega los tuyos aquí.
 * Campos obligatorios: id, title, description, tags
 * Opcionales: liveUrl, repoUrl, featured
 */
export const PROJECTS = [
  {
    id: 1,
    title: 'InveSchool',
    description: 'Sistema de inventario para instituciones educativas. Permite gestionar artículos de almacenamiento y administrativos, registrar movimientos de entrada y salida, dar de baja activos con evidencia fotográfica y generar reportes en PDF y Excel.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Supabase'],
    liveUrl: 'https://inveschool.netlify.app',
    repoUrl: 'https://github.com/YuranyRivera/InveSchool',
    featured: true,
  },
  {
    id: 2,
    title: 'Banco de Proyectos PAC',
    description: 'Plataforma de gestión de proyectos para aprendices del SENA. Permite crear proyectos, evaluarlos por objetivos y alcances, asignar aprendices y calcular promedios finales con diferentes roles de usuario.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'JWT'],
    liveUrl: null,
    repoUrl: 'https://github.com/InstruSenaDev/Banco-de-Proyectos---Pac',
    featured: true,
  },
]

export const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero' },
  { label: 'Sobre mí',   href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Contacto',   href: '#contact' },
]
