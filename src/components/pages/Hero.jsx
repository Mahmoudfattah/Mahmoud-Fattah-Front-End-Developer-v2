

// Section 1/8 — Hero
// Uses your existing CSS variables from index.css (--color-bg, --color-primary, --color-text, etc.)

export default function Hero() {
  return (
    <section id="hero">
      <div className=" w-full scroll-mt-20! ">
        <div className="gap-2 flex justify-between">
          <div className='flex-col flex flex-1 space-y-1.5'>
            <div className='flex'>
              <h1
                className='inline-block text-2xl pb-0  font-bold tracking-tighter sm:text-4xl xl:text-5xl/none'
                style={{ opacity: "1", filter: "blur(0px)", transform: "translateY(-8px)" }}
              >
                Hi, I'm Mahmoud 👋
              </h1>
            </div>

            <p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[600px] text-sm md:text-xl"
              style={{
                opacity: "1",
                filter: "blur(0px)",
                transform: "translateY(-8px)",
                color: "var(--color-hero)",
              }}
            >
              Front-end Engineer building fast, motion-rich UIs by day, and
              growing{" "}
              <a
                href="https://vt.tiktok.com/ZSXmWVn1x"
                target="_blank"
                rel="noreferrer"
                className="font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                DevFlow
              </a>{" "}
              for freelance clients by night. Let&apos;s connect on{" "}
              <a
                href="https://www.linkedin.com/in/mahmoud-fattah-a541b0262/"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                LinkedIn
              </a>
              .
            </p>
          </div>

          <div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              opacity: "1",
              filter: "blur(0px)",
              transform: "translateY(-8px)",
              color: "var(--color-muted)",
            }}
          >
            <span
              className="relative flex shrink-0 overflow-hidden rounded-full size-32 border"
              style={{ borderColor: "var(--border-color)" }}
            >
              <img
                src="/hero.webp"
                alt="Mahmoud Fattah, Front-End Engineer"
                width="128"
                height="128"
                fetchpriority="high"
                decoding="async"
                className="aspect-square h-full w-full object-cover"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}