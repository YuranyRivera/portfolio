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
  /* Video de fondo del hero (opcional). Coloca un .mp4 en /public y pon su ruta aquí,
     p. ej. '/hero.mp4'. Si queda vacío, el hero usa las capturas de los proyectos. */
  heroVideo: '',
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
 * Herramientas del carrusel de íconos.
 * `icon` es el nombre del ícono de Simple Icons en react-icons/si (ver components/Skills.jsx).
 */
export const TOOLS = [
  { name: 'React',       icon: 'SiReact',       color: '#61DAFB' },
  { name: 'Next.js',     icon: 'SiNextdotjs',   color: '#ffffff' },
  { name: 'JavaScript',  icon: 'SiJavascript',  color: '#F7DF1E' },
  { name: 'TypeScript',  icon: 'SiTypescript',  color: '#3178C6' },
  { name: 'HTML5',       icon: 'SiHtml5',       color: '#E34F26' },
  { name: 'CSS3',        icon: 'SiCss3',        color: '#1572B6' },
  { name: 'Tailwind',    icon: 'SiTailwindcss', color: '#06B6D4' },
  { name: 'Node.js',     icon: 'SiNodedotjs',   color: '#5FA04E' },
  { name: 'PostgreSQL',  icon: 'SiPostgresql',  color: '#4169E1' },
  { name: 'MySQL',       icon: 'SiMysql',       color: '#4479A1' },
  { name: 'Supabase',    icon: 'SiSupabase',    color: '#3FCF8E' },
  { name: 'Git',         icon: 'SiGit',         color: '#F05032' },
  { name: 'GitHub',      icon: 'SiGithub',      color: '#ffffff' },
  { name: 'Figma',       icon: 'SiFigma',       color: '#F24E1E' },
  { name: 'Vite',        icon: 'SiVite',        color: '#A855F7' },
]

/**
 * Proyectos — agrega los tuyos aquí.
 * Campos obligatorios: id, title, description, tags
 * Opcionales: liveUrl, repoUrl, featured (aparece primero), category,
 *             images: [{ src, alt }] capturas en /public para el carrusel
 *
 * La sección muestra una cuadrícula con "Ver más", así que escala bien
 * aunque haya muchos proyectos. Las capturas también alimentan la galería (Showcase).
 */
export const PROJECTS = [
  {
    id: 1,
    title: 'InveSchool',
    description: 'Sistema de inventario para instituciones educativas. Permite gestionar artículos de almacenamiento y administrativos, registrar movimientos de entrada y salida, dar de baja activos con evidencia fotográfica y generar reportes en PDF y Excel.',
    category: 'Full-stack · Gestión de inventario',
    images: [
      { src: '/projects/inveschool-2.jpg', alt: 'Tablero con resumen del inventario' },
      { src: '/projects/inveschool-3.jpg', alt: 'Listado de artículos con filtros y exportación' },
      { src: '/projects/inveschool-4.jpg', alt: 'Registro de movimientos de entrada y salida' },
      { src: '/projects/inveschool-5.jpg', alt: 'Gestión de usuarios y roles' },
      { src: '/projects/inveschool-1.jpg', alt: 'Pantalla de inicio de sesión' },
    ],
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'JWT'],
    liveUrl: 'https://frontend-phi-five-52.vercel.app/articles',
    repoUrl: 'https://github.com/YuranyRivera/InveSchool',
    featured: true,
  },
  {
    id: 2,
    title: 'Banco de Proyectos PAC',
    description: 'Plataforma de gestión de proyectos para aprendices del SENA. Permite crear proyectos, evaluarlos por objetivos y alcances, asignar aprendices y calcular promedios finales con diferentes roles de usuario.',
    category: 'Full-stack · Plataforma educativa',
    images: [
      { src: '/projects/banco-pac-1.jpg', alt: 'Página de inicio' },
      { src: '/projects/banco-pac-2.jpg', alt: 'Inicio de sesión' },
      { src: '/projects/banco-pac-3.jpg', alt: 'Registro de usuarios' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'JWT'],
    liveUrl: 'https://banco-de-proyectos.netlify.app',
    repoUrl: 'https://github.com/YuranyRivera/Banco-de-Proyectos-PAC',
    featured: true,
  },
]

export const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero' },
  { label: 'Sobre mí',   href: '#about' },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto',   href: '#contact' },
]
