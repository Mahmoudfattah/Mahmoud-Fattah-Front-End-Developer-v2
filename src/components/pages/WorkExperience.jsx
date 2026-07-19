import { useState } from "react";

// Section 5/8 — Work Experience
// Matches the reference layout: circular logo, company name, date range top-right,
// role bottom-left, duration bottom-right, and a description that expands on click.
// Swap `logo: null` for a real image path when you have company logos.

const experience = [
  {
    id: "aithon",
    company: "Aithon",
    url: null,
    logo: "/exp/aithon.webp",
    style: { objectPosition: "0px 0px ", transform: "scale(1.4)" },
    initials: "A",
    role: "Front-End Developer",
    dates: "January 2026 - Present",
    duration: "6 mos",
    description:
      "Architected the full frontend of an enterprise ERP system (React, TypeScript, Next.js + Laravel REST API) across Inventory, Sales, Purchases, and Task Management modules. Engineered a real-time multi-location inventory module with automatic status logic, bulk allocations, and a complete movement audit trail. Designed typed API service layers with Axios + Sanctum auth and RTK Query caching, eliminating redundant requests. Delivered sales/purchase order analytics dashboards enabling real-time business decisions.",
  },
  {
    id: "apex",
    company: "Apex Company",
    url: null,
    logo: "/exp/apex.webp",
    initials: "AC",
    role: "Trainee Front-end Developer",
    dates: "June 2025 - July 2025",
    duration: "2 mos",
    description:
      "Shipped a full reporting suite (React, TypeScript, Tailwind CSS) with Chart.js visualizations and XLSX.js export, delivered in under one week with 100% data accuracy across all medical and financial report types.",
  },
];

// Chevron that starts pointing right (dim) and rotates to point down (bright) when open
function ToggleArrow({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 transition-all duration-300 ease-out"
      style={{
        color: "var(--color-muted)",
        opacity: open ? 1 : 0.45,
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
      }}
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExperienceItem({ item }) {
  const [open, setOpen] = useState(false);
  const descId = `${item.id}-description`;

  return (
    <div className="flex w-full items-start gap-4 rounded-xl py-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-icons-border)]">
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.company}
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
            className="h-full border w-full object-cover"
            style={item.style}
          />
        ) : (
          <div
            className="flex h-full w-full items-center border rounded-r-full justify-center text-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              color: "#0d0d0d",
            }}
          >
            {item.initials}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          {/* The disclosure toggle and the external link are siblings, not
              nested — an <a> inside a <button> is invalid HTML and creates
              unpredictable keyboard/screen-reader behavior. */}
          <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={descId}
              className="flex items-center gap-1.5"
            >
              {item.company}
              <ToggleArrow open={open} />
            </button>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="opacity-70 hover:opacity-100"
                aria-label={`${item.company} website`}
              >
                ↗
              </a>
            )}
          </div>
          <time className="shrink-0 text-xs" style={{ color: "var(--color-muted)" }}>
            {item.dates}
          </time>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            {item.role}
          </p>
          <span className="shrink-0 text-[11px]" style={{ color: "var(--color-muted)" }}>
            {item.duration}
          </span>
        </div>

        {open && (
          <p id={descId} className="mt-2 text-sm leading-5" style={{ color: "var(--text-gray)" }}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function WorkExperience() {
  return (
    <section id="work-experience" className="">
      <h2 className=" text-xl font-bold" style={{ color: "var(--color-text)" }}>
        Work Experience
      </h2>

      <div className="flex flex-col">
        {experience.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}