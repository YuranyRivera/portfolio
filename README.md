# Portafolio — Yurany Sofia Rivera De La Cruz

Portfolio personal construido con **React + Vite**, animaciones con **Framer Motion** y partículas con **tsParticles**.

---

## 🚀 Cómo ejecutarlo

```bash
# 1. Instala dependencias
npm install

# 2. Levanta el servidor de desarrollo
npm run dev

# 3. Abre en el navegador
# http://localhost:5173
```

## 🏗️ Estructura del proyecto

```
src/
├── components/         # Un componente = un archivo JSX + su CSS module
│   ├── Navbar.jsx / .module.css
│   ├── Hero.jsx / .module.css
│   ├── ParticleBackground.jsx
│   ├── About.jsx / .module.css
│   ├── Skills.jsx / .module.css
│   ├── Projects.jsx / .module.css
│   ├── Contact.jsx / .module.css
│   └── Footer.jsx / .module.css
├── data/
│   └── portfolio.js    ← ✏️ EDITA AQUÍ tus datos personales y proyectos
├── hooks/
│   └── useReveal.js    # Hook para animaciones al hacer scroll
├── styles/
│   └── globals.css     # Variables CSS y estilos base
├── App.jsx
└── main.jsx
```

## ✏️ Personalizar

Todo el contenido está centralizado en **`src/data/portfolio.js`**:

- `PERSONAL_INFO` → tu nombre, bio, email, GitHub, LinkedIn
- `SKILLS` → tecnologías agrupadas por categoría
- `PROJECTS` → tus proyectos con título, descripción, tags y URLs

## 🎨 Cambiar colores

Las variables de color están en `src/styles/globals.css`:

```css
--clr-purple-500: #8b5cf6;   /* color de acento principal */
--clr-bg:         #080810;   /* fondo */
```

## 📦 Scripts

| Comando         | Descripción                        |
|-----------------|------------------------------------|
| `npm run dev`   | Servidor de desarrollo             |
| `npm run build` | Compilar para producción           |
| `npm run preview` | Ver build de producción localmente |
| `npm run lint`  | Revisar errores de código          |

## 🌐 Publicar en Vercel (gratis)

1. Sube el proyecto a GitHub
2. Entra a [vercel.com](https://vercel.com)
3. Importa el repositorio → Vercel detecta Vite automáticamente
4. ¡Listo! Tu URL en `*.vercel.app`

## 🛠️ Stack

- **React 18** + **Vite 5**
- **Framer Motion** — animaciones
- **tsParticles** — fondo animado
- **CSS Modules** — estilos sin conflictos
- **react-intersection-observer** — animaciones al scroll
