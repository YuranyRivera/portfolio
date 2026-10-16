/**
 * utils/techIcons.js
 * Mapa de logos de tecnologías (react-icons) usado por Skills y Journey.
 * Las claves coinciden con el campo `icon` de TOOLS en src/data/portfolio.js
 */
import {
  SiReact, SiExpo, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiPostgresql, SiSupabase, SiDbeaver, SiGithub, SiBitbucket, SiFigma, SiVite,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import { VscAzure } from 'react-icons/vsc'
import { TOOLS } from '@/data/portfolio'

export const ICONS = {
  react: SiReact,
  reactNative: TbBrandReactNative,
  expo: SiExpo,
  next: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  node: SiNodedotjs,
  postgres: SiPostgresql,
  supabase: SiSupabase,
  azure: VscAzure,
  dbeaver: SiDbeaver,
  github: SiGithub,
  bitbucket: SiBitbucket,
  figma: SiFigma,
  vite: SiVite,
}

const BY_NAME = Object.fromEntries(TOOLS.map((t) => [t.name, t]))

/** Devuelve { Icon, color } para un nombre de herramienta, o null si no tiene logo */
export function getTool(name) {
  const tool = BY_NAME[name]
  if (!tool || !ICONS[tool.icon]) return null
  return { Icon: ICONS[tool.icon], color: tool.color }
}
