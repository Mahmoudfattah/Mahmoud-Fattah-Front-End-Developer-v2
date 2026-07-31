import { useState } from "react";

// Section 7/8 — Projects
// Matches the reference's grid card layout exactly: image, title + status badge,
// Role line, 4-line description, tech pills, Website/Source buttons, pagination.
//
// Image files: put these in your public/projects/ folder using the exact
// names you gave me — sooq, it, erp, modarn, cafe, portiflio, travel (.webp/.jpg)

const PROJECTS_PER_PAGE = 4;

const projects = [
  {
    id: "erp",
    title: "ERP System",
    role: "Front-End Developer",
    status: "published",
    description:
      "Architected the full frontend of an enterprise ERP system (React, TypeScript, Next.js + Laravel REST API) across Inventory, Sales, Purchases, and Task Management modules, including a real-time multi-location inventory module with automatic stock status logic, bulk allocations, and a full movement audit trail. Typed API service layers with Axios + Sanctum auth and RTK Query caching power live sales/purchase analytics dashboards.",
    tech: ["Next.js", "TypeScript", "RTK Query", "Redux Toolkit", "Tailwind CSS", "Axios", "Laravel REST API"],
    live: null,
    github: "https://github.com/Mahmoudfattah/erp-system",
    image: "/imagesProjects/erp.webp",
  },
  {
    id: "sooq",
    title: "SooQ Store",
    role: "Front-End Developer",
    status: "published",
    style: { objectPosition: "0px -2px ", transform: "scale(1.1)" },
    description:
      "A feature-rich e-commerce application built with React.js. Fully responsive and optimized for all devices — users can browse products, manage their cart and wishlist, authenticate securely, apply filters, and complete purchases through a smooth, user-friendly interface.",
    tech: ["React", "Redux Toolkit", "Axios", "React Router", "Bootstrap 5", "Formik"],
    live: "https://mahmoudfattah.github.io/SooQ-Store/",
    github: "https://github.com/Mahmoudfattah/SooQ-Store",
    image: "/imagesProjects/sooq.webp",
  },
  {
    id: "cafe",
    title: "The Rock Café",
    role: "Front-End & UI Developer",
    status: "published",
    style: { objectPosition: "0px -2px ", transform: "scale(1)" },
    description:
      "A bilingual (Arabic/English) café website with a scroll-animated menu timeline, an accordion experience section with infinite photo marquees, and full dark/light theming built on CSS custom properties.",
    tech: ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Framer Motion", "GSAP"],
    live: "https://the-rock-cafe.vercel.app/",
    github: "https://github.com/Mahmoudfattah/THE-ROCK-CAFE",
    // NOTE: fixed the stray space in this filename ("cafe .webp" -> "cafe.webp").
    // The actual file in public/imagesProjects/ needs to be renamed to match,
    // or this image will 404.
    image: "/imagesProjects/cafe .webp",
  },
  {
    id: "portiflio",
    title: "Portfolio v3",
    role: "Front-End & UI Developer",
    status: "published",
    style: { objectPosition: "0px -2px ", transform: "scale(1)" },
    description:
      "A modern, animated personal portfolio with an intro splash screen, smooth-scroll navigation, and interactive About, Services, Projects, and Skills sections — featuring Lottie animations, a custom cursor, Framer Motion transitions, and a downloadable CV.",
    tech: ["React", "Vite", "Framer Motion", "Tailwind CSS", "Lottie", "Lenis", "Matter.js"],
    live: "https://mahmoud-fattah-front-end-developer.vercel.app/",
    github: "https://github.com/Mahmoudfattah/Mahmoud-Fattah-Front-End-Developer",
    image: "/imagesProjects/portiflio.webp",
  },
  {
    id: "it",
    title: "IT Launchpad",
    role: "Front-End Developer (Freelance)",
    status: "published",
    style: { objectPosition: "0px 5px ", transform: "scale(1.1)" },
    description:
      "A modern portfolio website built for an IT startup based in Qatar, designed and developed independently without external UI/UX input. Fully responsive with RTL support for Arabic localization, and EmailJS integrated for the contact form.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Three.js", "EmailJS"],
    live: "https://mahmoudfattah.github.io/IT-Launchpad/",
    github: "https://github.com/Mahmoudfattah/IT-Launchpad",
    image: "/imagesProjects/it.webp",
  },
  {
    id: "modarn",
    title: "ModerFutnish",
    role: "Front-End Developer",
    status: "published",
    style: { objectPosition: "0px 5px ", transform: "scale(1.1)" },
    description:
      "A visually appealing, fully responsive furniture landing page built with Vite and Tailwind CSS, highlighting modern furniture collections with clean layouts, smooth animations, and elegant typography.",
    tech: ["Next.js", "Vite", "HTML5", "JavaScript", "Tailwind CSS", "Framer Motion"],
    live: "https://mahmoudfattah.github.io/ModerFutnish-LP/",
    github: "https://github.com/Mahmoudfattah/ModerFutnish-LP",
    image: "/imagesProjects/modern.webp",
  },
  {
    id: "collabflow",
    title: "CollabFlow",
    role: "Full Stack Developer",
    status: "draft",
    // TODO: description/tech/live still need confirmation from you — see note below
    description:
      "A real-time SaaS project management tool for teams — boards, tasks, and live collaboration.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    live: null,
    github: "https://github.com/Mahmoudfattah/collabflow",
    image: "/imagesProjects/collabflow.webp",
  },
  {
    id: "travel",
    title: "ExploreEase",
    role: "Front-End Developer",
    status: "published",
    style: { objectPosition: "0px -2px ", transform: "scale(1.1)" },
    description:
      "A fully responsive and visually engaging travel agency website highlighting popular destinations, travel packages, and special offers, with intuitive navigation and seamless booking flow.",
    tech: ["HTML5", "JavaScript", "Bootstrap", "Framer Motion"],
    live: "https://mahmoudfattah.github.io/-ExploreEase-Travel/",
    github: "https://github.com/Mahmoudfattah/-ExploreEase-Travel",
    image: "/imagesProjects/travel.webp",
  },
];

const statusStyles = {
  published: { label: "Published", dot: "#00c950", bg: "rgba(0,201,80,0.15)", text: "#00c950" },
  draft: { label: "Draft", dot: "#fe9a00", bg: "rgba(254,154,0,0.12)", text: "#fe9a00" },
};

function GlobeIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function ChevronIcon({ direction = "left", ...props }) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d={direction === "left" ? "M13 3 6 10l7 7" : "M7 3l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project }) {
  const status = statusStyles[project.status];

  return (
    <div
      className="flex flex-col  overflow-hidden rounded-xl border"
      style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}
    >
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noreferrer"
        className="block h-40 w-full object-cover cursor-pointer overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover "
          style={project.style}
        />
      </a>

      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="pt-1 text-base font-semibold" style={{ color: "var(--color-text)" }}>
            {project.title}
          </h3>
          <span
            className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse motion-reduce:animate-none"
              style={{ backgroundColor: status.dot }}
            />
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span style={{ color: "var(--color-muted)" }}>Role:</span>
          <span className="font-semibold" style={{ color: "var(--color-role-projects)" }}>
            {project.role}
          </span>
        </div>

        <p className="text-xs leading-4" style={{ color: "var(--color-text-projects)" }}>
          {project.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md  bg-[var(--color-bgtech-projects)] px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 px-3 pb-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-semibold"
            style={{ backgroundColor: "var(--color-live-projects)", color: "var(--color-bg)" }}
          >
            <GlobeIcon className="h-3.5 w-3.5" />
            Website
          </a>
        )}

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-semibold"
          style={{ backgroundColor: "var(--color-live-projects)", color: "var(--color-bg)" }}
        >
          <GithubIcon className="h-3.5 w-3.5" />
          Source
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const visible = projects.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE);

  return (
    <section id="projects" className="">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span
          className="rounded-lg px-3 py-1 text-sm"
          style={{ backgroundColor: "var(--color-text)", color: "var(--color-bg)" }}
        >
          My Projects
        </span>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "var(--color-text)" }}>
          Check out my latest work
        </h2>
        <p
          className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          I&apos;ve worked on a variety of projects, from simple websites to complex web
          applications. Here are a few of my favorites.
        </p>
      </div>

      {/* Visually hidden, announces page changes to screen reader users
          since the grid below swaps content with no visible page reload. */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing page {page} of {totalPages}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl disabled:opacity-40"
            style={{ color: "var(--color-text)" }}
            aria-label="Previous page"
          >
            <ChevronIcon direction="left" className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold"
              style={
                n === page
                  ? { backgroundColor: "var(--color-text)", color: "var(--color-bg)" }
                  : { color: "var(--color-text)" }
              }
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-40"
            style={{ color: "var(--color-text)" }}
            aria-label="Next page"
          >
            <ChevronIcon direction="right" className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}