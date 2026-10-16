/**
 * data/portfolio.js
 * Fuente central de datos del portafolio.
 * Edita aquí para actualizar todo el sitio.
 */

export const PERSONAL_INFO = {
  name: 'Yurany Sofia Rivera De La Cruz',
  shortName: 'Sofia Rivera',
  role: 'Desarrolladora Web & Mobile',
  tagline: 'Construyo aplicaciones web y móviles que las personas disfrutan usar.',
  bio: `Desarrolladora de software formada en el SENA, apasionada por construir productos que
  combinan funcionalidad y buen diseño. Hoy desarrollo aplicaciones web y móviles con React,
  TypeScript, React Native y Node.js, y disfruto cada desafío que me acerca más a ser mejor en
  lo que hago.`,
  location: 'Colombia',
  email: 'yuranidelacruz2006@gmail.com',
  github: 'https://github.com/YuranyRivera',
  linkedin: 'https://www.linkedin.com/in/sofia-de-la-cruz-5828ba311',
  avatar: '/sofia.png',
  /* Video de fondo del hero (opcional). Coloca un .mp4 en /public y pon su ruta aquí,
     p. ej. '/hero.mp4'. Si queda vacío, el hero usa la cuadrícula sobre el fondo animado. */
  heroVideo: '',
}

export const SKILLS = [
  {
    category: 'Frontend & Mobile',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend, BD & Cloud',
    items: ['Node.js', 'SQL', 'PostgreSQL', 'Supabase', 'Azure', 'REST APIs'],
  },
  {
    category: 'Herramientas & Prácticas',
    items: ['Git, GitHub & Bitbucket', 'Figma', 'DBeaver', 'Vite', 'Scrum / Kanban', 'Responsive Design'],
  },
]

/**
 * Herramientas con logo (carrusel de habilidades y chips de la trayectoria).
 * `icon` es una clave del mapa de íconos en src/utils/techIcons.js
 */
export const TOOLS = [
  { name: 'React',        icon: 'react',       color: '#61DAFB' },
  { name: 'React Native', icon: 'reactNative', color: '#61DAFB' },
  { name: 'Expo',         icon: 'expo',        color: '#ffffff' },
  { name: 'Next.js',      icon: 'next',        color: '#ffffff' },
  { name: 'TypeScript',   icon: 'typescript',  color: '#3178C6' },
  { name: 'JavaScript',   icon: 'javascript',  color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: 'tailwind',    color: '#06B6D4' },
  { name: 'Bootstrap',    icon: 'bootstrap',   color: '#7952B3' },
  { name: 'Node.js',      icon: 'node',        color: '#5FA04E' },
  { name: 'PostgreSQL',   icon: 'postgres',    color: '#4169E1' },
  { name: 'Supabase',     icon: 'supabase',    color: '#3FCF8E' },
  { name: 'Azure',        icon: 'azure',       color: '#0089D6' },
  { name: 'DBeaver',      icon: 'dbeaver',     color: '#C9A27E' },
  { name: 'GitHub',       icon: 'github',      color: '#ffffff' },
  { name: 'Bitbucket',    icon: 'bitbucket',   color: '#2684FF' },
  { name: 'Figma',        icon: 'figma',       color: '#F24E1E' },
  { name: 'Vite',         icon: 'vite',        color: '#A855F7' },
]

/**
 * Trayectoria — de la formación a hoy, en orden cronológico.
 * `stack` usa nombres de TOOLS para mostrar su logo (los que no estén salen como texto).
 */
export const JOURNEY = [
  {
    label: 'Formación',
    title: 'SENA · Banco de Proyectos PAC',
    description: 'Me formé como desarrolladora en el SENA, donde construí varios proyectos. El proyecto final fue el Banco de Proyectos PAC: una plataforma donde los aprendices cargan sus proyectos y los instructores los revisan y los aprueban o no.',
    stack: ['React', 'Vite', 'Bootstrap', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Figma'],
  },
  {
    label: 'Proyecto',
    title: 'InveSchool',
    description: 'Desarrollé un sistema de inventario para un colegio: registra los elementos que ingresan y salen, su precio y su ubicación, y genera reportes para llevar el control.',
    stack: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'Supabase', 'SQL', 'Figma'],
  },
  {
    label: 'Experiencia',
    title: 'Desarrolladora en empresa de software',
    description: 'Trabajé en el desarrollo de aplicaciones web en equipo, con control de versiones en Bitbucket, diseño en Figma y bases de datos SQL.',
    stack: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'SQL', 'DBeaver', 'Bitbucket', 'Figma'],
  },
  {
    label: 'Actualidad',
    current: true,
    title: 'Desarrolladora web y mobile',
    description: 'Hoy construyo aplicaciones web y móviles: interfaces en React y React Native con Expo, servicios en Node.js y despliegue en Azure.',
    stack: ['React', 'React Native', 'Expo', 'TypeScript', 'JavaScript', 'Node.js', 'Azure'],
  },
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
      { src: '/projects/inveschool-1.jpg', alt: 'Pantalla de inicio de sesión' },
      { src: '/projects/inveschool-2.jpg', alt: 'Tablero con resumen del inventario' },
      { src: '/projects/inveschool-3.jpg', alt: 'Listado de artículos con filtros y exportación' },
      { src: '/projects/inveschool-4.jpg', alt: 'Registro de movimientos de entrada y salida' },
      { src: '/projects/inveschool-5.jpg', alt: 'Gestión de usuarios y roles' },
    ],
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'JWT', 'Figma'],
    liveUrl: 'https://frontend-phi-five-52.vercel.app/articles',
    repoUrl: 'https://github.com/YuranyRivera/InveSchool',
    featured: true,
  },
  {
    id: 2,
    title: 'Banco de Proyectos PAC',
    description: 'Proyecto final del SENA: plataforma donde los aprendices cargan sus proyectos y los instructores los evalúan por objetivos y alcances y los aprueban o no. Incluye asignación de aprendices, promedios finales y distintos roles de usuario.',
    category: 'Full-stack · Plataforma educativa',
    images: [
      { src: '/projects/banco-pac-1.jpg', alt: 'Página de inicio' },
      { src: '/projects/banco-pac-2.jpg', alt: 'Inicio de sesión' },
      { src: '/projects/banco-pac-3.jpg', alt: 'Registro de usuarios' },
    ],
    tags: ['React', 'Vite', 'Bootstrap', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'JWT', 'Figma'],
    liveUrl: 'https://banco-de-proyectos.netlify.app',
    repoUrl: 'https://github.com/YuranyRivera/Banco-de-Proyectos-PAC',
    featured: true,
  },
]

export const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero' },
  { label: 'Sobre mí',   href: '#about' },
  { label: 'Trayectoria', href: '#journey' },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto',   href: '#contact' },
]
