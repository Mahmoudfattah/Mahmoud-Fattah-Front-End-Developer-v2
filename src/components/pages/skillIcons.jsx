// skillIcons.jsx
// These are placeholder icons from react-icons (single-color, currentColor fill).
// The reference site uses full multi-color 128x128 brand SVGs (devicon-style),
// which react-icons/si does NOT provide for most of these.
//
// TO GET THE EXACT REFERENCE LOOK:
// 1. Go to https://svgl.app
// 2. Search each tech (e.g. "TypeScript", "Node.js", "PostgreSQL")
// 3. Copy the SVG code
// 4. Paste it here as a component, replacing the react-icons import for that skill
//
// Example of what a swapped-in icon looks like:
// export const TypeScriptIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
//     {/* paste svgl.app path data here */}
//   </svg>
// );
// Then in Skills.jsx: icon: <TypeScriptIcon />, color: undefined (svg already has its own colors)

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaGithub,
  FaSass, FaFigma, FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiRedux, SiFirebase,
  SiVite, SiJest, SiFramer, SiStyledcomponents, SiAxios, SiMysql,
  SiSupabase, SiThreedotjs, SiReactquery, SiGreensock,
  SiNodedotjs, SiPostgresql, SiDocker,
} from "react-icons/si";
import { TbBoxMultiple } from "react-icons/tb";

// Icons sourced directly from svgl.app — keep their original baked-in brand
// colors exactly as-is. Do NOT tint these with skill.color; only the label
// text next to them should follow the light/dark theme color.
export const TypeScriptIcon = (props) => (
  <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="#3178C6"
    />
    <path
      d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      fill="#FFF"
    />
  </svg>
);

export const JavaScriptIcon = (props) => (
  <svg {...props} viewBox="0 0 1052 1052">
    <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
    <path
      d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
      fill="#323330"
    />
  </svg>
);

export const MaterialUIIcon = (props) => (
  <svg {...props} viewBox="0 0 128 128">
    <path fill="#1FA6CA" d="M.2 68.6V13.4L48 41v18.4L16.1 41v36.8z" />
    <path fill="#1C7FB6" d="m48 41 47.9-27.6v55.3L64 87l-16-9.2 32-18.4V41L48 59.4z" />
    <path fill="#1FA6CA" d="M48 77.8v18.4l32 18.4V96.2z" />
    <path
      fill="#1C7FB6"
      d="M80 114.6 127.8 87V50.2l-16 9.2v18.4L80 96.2zM111.9 41V22.6l16-9.2v18.4z"
    />
  </svg>
);

export const ShadcnUIIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="m19.01 11.55-7.46 7.46c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0l7.46-7.46c.46-.46.46-1.19 0-1.65s-1.19-.46-1.65 0Zm.16-8.21c-.46-.46-1.19-.46-1.65 0L3.34 17.52c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0L19.16 4.99c.46-.46.46-1.19 0-1.65Z" />
  </svg>
);

export const icons = {
  typescript: { icon: <TypeScriptIcon className="h-5 w-5" />, color: undefined },
  javascript: { icon: <JavaScriptIcon className="h-5 w-5" />, color: undefined },
  react: { icon: <FaReact />, color: "#61dbfb" },
  nextjs: { icon: <SiNextdotjs />, color: "#ffffff" },
  html5: { icon: <FaHtml5 />, color: "#e34c26" },
  css3: { icon: <FaCss3Alt />, color: "#264de4" },
  tailwind: { icon: <SiTailwindcss />, color: "#38bdf8" },
  bootstrap: { icon: <FaBootstrap />, color: "#7952b3" },
  sass: { icon: <FaSass />, color: "#cd6799" },
  styled: { icon: <SiStyledcomponents />, color: "#db7093" },
  shadcn: { icon: <ShadcnUIIcon className="h-5 w-5" />, color: "#ffffff" },
  materialui: { icon: <MaterialUIIcon className="h-5 w-5" />, color: undefined },
  gsap: { icon: <SiGreensock />, color: "#88ce02" },
  threejs: { icon: <SiThreedotjs />, color: "#ffffff" },
  framer: { icon: <SiFramer />, color: "#0055ff" },
  redux: { icon: <SiRedux />, color: "#764abc" },
  reactquery: { icon: <SiReactquery />, color: "#ff4154" },
  zustand: { icon: <TbBoxMultiple />, color: "#a3a3a3" },
  nodejs: { icon: <SiNodedotjs />, color: "#3c873a" },
  supabase: { icon: <SiSupabase />, color: "#3ecf8e" },
  firebase: { icon: <SiFirebase />, color: "#ffca28" },
  sql: { icon: <FaDatabase />, color: "#00758f" },
  mysql: { icon: <SiMysql />, color: "#00758f" },
  postgresql: { icon: <SiPostgresql />, color: "#336791" },
  docker: { icon: <SiDocker />, color: "#019bc6" },
  git: { icon: <FaGitAlt />, color: "#f1502f" },
  github: { icon: <FaGithub />, color: "#ffffff" },
  vite: { icon: <SiVite />, color: "#646cff" },
  axios: { icon: <SiAxios />, color: "#5a29e4" },
  jest: { icon: <SiJest />, color: "#99425b" },
  figma: { icon: <FaFigma />, color: "#a259ff" },
};