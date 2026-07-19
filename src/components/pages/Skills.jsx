import { icons } from "./skillIcons";

// Section 6/8 — Skills
// Matches the reference markup exactly:
//   <div class="bg-muted/50 rounded-lg p-4">
//     <h3 class="text-lg font-semibold mb-3 text-primary">category</h3>
//     <div class="flex flex-wrap gap-2">
//       <div class="inline-flex items-center rounded-md border ... bg-secondary px-3 py-1.5 text-sm font-medium">
//         <svg class="mr-2 size-5">...</svg>Label
//       </div>
//     </div>
//   </div>
// bg-muted / bg-secondary / text-primary are shadcn theme tokens — mapped
// below to your own CSS variables from index.css.

const skillGroups = [
  {
    title: "languages",
    skills: [
      { name: "TypeScript", ...icons.typescript },
      { name: "JavaScript", ...icons.javascript },
    ],
  },
  {
    title: "frontend",
    skills: [
      { name: "React", ...icons.react },
      { name: "Next.js", ...icons.nextjs },
      { name: "HTML5", ...icons.html5 },
      { name: "CSS3", ...icons.css3 },
      { name: "Tailwind CSS", ...icons.tailwind },
      { name: "Bootstrap 5", ...icons.bootstrap },
      { name: "Sass", ...icons.sass },
      { name: "Styled Components", ...icons.styled },
      { name: "Material UI", ...icons.materialui },
      { name: "shadcn/ui", ...icons.shadcn },
    ],
  },
  {
    title: "animation",
    skills: [
      { name: "GSAP", ...icons.gsap },
      { name: "Three.js", ...icons.threejs },
      { name: "Framer Motion", ...icons.framer },
    ],
  },
  {
    title: "state management",
    skills: [
      { name: "Redux Toolkit", ...icons.redux },
      { name: "React Query", ...icons.reactquery },
      { name: "Zustand", ...icons.zustand },
    ],
  },
  {
    title: "backend / db",
    skills: [
      { name: "Node.js", ...icons.nodejs },
      { name: "Supabase", ...icons.supabase },
      { name: "Firebase", ...icons.firebase },
      { name: "PostgreSQL", ...icons.postgresql },
      { name: "MySQL", ...icons.mysql },
    ],
  },
  {
    title: "tools",
    skills: [
      { name: "Git", ...icons.git },
      { name: "GitHub", ...icons.github },
      { name: "Vite", ...icons.vite },
      { name: "Axios", ...icons.axios },
      { name: "Jest", ...icons.jest },
      { name: "Figma", ...icons.figma },
      { name: "Docker", ...icons.docker },
    ],
  },
];

function SkillPill({ skill }) {
  return (
    <div
      className="inline-flex items-center rounded-md px-3 border-1 border-[var(--color-icons-border)]  bg-[var(--color-bg-icons)]  py-1.5 text-sm font-medium transition-colors"
      
     
    >
      <span className="mr-2 inline-flex text-[1.1rem]" style={{ color: skill.color }}>
        {skill.icon}
      </span>
      {skill.name}
    </div>
  );
}

function SkillGroup({ group }) {
  return (
    <div
      className="rounded-lg p-4 bg-[var(--color-bg-skills)] "
      
    >
      <h3 className="mb-3 text-lg font-semibold" style={{ color: "var(--color-text)" }}>
        {group.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="flex min-h-0 flex-col gap-y-3">
      <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
        Skills
      </h2>

      <div className="flex flex-wrap gap-1">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}