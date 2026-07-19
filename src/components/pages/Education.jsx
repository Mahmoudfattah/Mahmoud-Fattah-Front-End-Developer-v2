const education = [
  {
    id: "helwan-university",
    company: "Helwan University",
    url: "",
    logo: "/exp/helwan.webp",
    style: { transform: "scale(1.1)" },
    initials: "A",
    role: "CS bachelores",
    dates: " 2020 - 2024",
    duration: "4 yrs",
  },
];

function EducationItem({ item }) {
  return (
    <div className="flex w-full items-start gap-4 rounded-xl py-4">
      <div className="flex h-12 w-12 shrink-0 border items-center justify-center overflow-hidden rounded-full">
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
          {/* Static entry, nothing to toggle — a <button> with no action
              would be a focusable dead-end for keyboard/screen-reader
              users, so this is plain text, not an interactive control. */}
          <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            {item.company}
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">
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
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="">
      <h2 className=" text-xl font-bold" style={{ color: "var(--color-text)" }}>
        Education
      </h2>

      <div className="flex flex-col">
        {education.map((item) => (
          <EducationItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}