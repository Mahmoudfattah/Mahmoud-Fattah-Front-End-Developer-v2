import { useEffect, memo } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Star,
  ArrowLeft,
} from "lucide-react";

// ============================================================
// SEO CONFIG
// ============================================================

const SEO = {
  title: "Mahmoud Fattah — Web Developer, Content Creator & Video Editor",
  description:
    "Mahmoud Fattah is a Web Developer, Content Creator and Video Editor. 43+ projects delivered. Explore my portfolio, work, and social links.",
  url: "https://mahmoudfattah.netlify.app/links",
  image: "/src/assets/images/mahmoud-sketch.webp",
};

// ============================================================
// BRAND DATA
// ============================================================

const professionalLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mahmoud-fattah-a541b0262/",
    type: "linkedin",
    accent: "yellow",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~01d956de466f8bd67c",
    type: "upwork",
    accent: "white",
  },
  {
    name: "Mostaql",
    href: "https://mostaql.com/u/Mahmoud_Fattah1",
    type: "mostaql",
    accent: "blue",
  },
  {
    name: "GitHub",
    href: "https://github.com/Mahmoudfattah",
    type: "github",
    accent: "white",
  },
];

const devFlowLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/_dev_flow",
    type: "instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@dev_flow",
    type: "tiktok",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1Eou4xuMAM/",
    type: "facebook",
  },
];

const personalLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mo__fattah",
    type: "instagram",
  },
];

// ============================================================
// SOCIAL ICONS (memoized — pure, prop-driven, no re-render cost)
// ============================================================

const SocialIcon = memo(function SocialIcon({ type, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: "false",
  };

  if (type === "linkedin") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
        <path
          d="M7 9.5V16.8"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7" cy="7.2" r="1" fill="white" />
        <path
          d="M11 16.8V12.8C11 11.7 11.8 10.8 13 10.8C14.2 10.8 15 11.7 15 12.8V16.8"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M11 11V16.8"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path
          d="M12 2.5C6.75 2.5 2.5 6.8 2.5 12.1C2.5 16.35 5.24 19.96 9.03 21.23C9.5 21.32 9.67 21.03 9.67 20.76C9.67 20.52 9.66 19.72 9.66 18.61C7 19.19 6.4 17.3 6.4 17.3C5.97 16.2 5.34 15.91 5.34 15.91C4.47 15.3 5.4 15.31 5.4 15.31C6.36 15.38 6.86 16.31 6.86 16.31C7.72 17.8 9.12 17.37 9.68 17.12C9.77 16.5 10.02 16.08 10.3 15.84C8.18 15.6 5.95 14.77 5.95 11.1C5.95 10.05 6.32 9.2 6.88 8.53C6.78 8.29 6.45 7.32 6.98 6.02C6.98 6.02 7.78 5.76 9.61 7.03C10.38 6.81 11.2 6.7 12 6.69C12.8 6.7 13.62 6.81 14.39 7.03C16.22 5.76 17.02 6.02 17.02 6.02C17.55 7.32 17.22 8.29 17.12 8.53C17.68 9.2 18.05 10.05 18.05 11.1C18.05 14.78 15.82 15.59 13.69 15.84C14.04 16.14 14.34 16.72 14.34 17.61C14.34 18.89 14.33 19.91 14.33 20.76C14.33 21.03 14.5 21.32 14.97 21.23C18.76 19.96 21.5 16.35 21.5 12.1C21.5 6.8 17.25 2.5 12 2.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg {...common}>
        <path
          d="M13.3 21V13.2H16L16.4 10.2H13.3V8.3C13.3 7.43 13.54 6.84 14.82 6.84H16.5V4.15C16.21 4.11 15.21 4 14.06 4C11.67 4 10.03 5.46 10.03 8.17V10.2H7.35V13.2H10.03V21H13.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "tiktok") {
    return (
      <svg {...common}>
        <path
          d="M15.2 4C15.45 5.45 16.3 6.55 17.8 7.05V9.65C16.35 9.53 15.16 9.05 14.18 8.2V14.5C14.18 17.92 11.8 20 8.85 20C6.2 20 4 18.06 4 15.28C4 12.44 6.28 10.29 9.25 10.29C9.55 10.29 9.85 10.33 10.15 10.39V13.08C9.86 12.99 9.55 12.94 9.24 12.94C7.85 12.94 6.8 13.92 6.8 15.24C6.8 16.54 7.82 17.43 8.95 17.43C10.44 17.43 11.42 16.47 11.42 14.82V4H15.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "upwork") {
    return (
      <div
        aria-hidden="true"
        className="font-black text-[17px] tracking-[-0.08em] leading-none"
      >
        up
        <span className="text-[12px] align-top ml-[1px]">⌁</span>
        work
      </div>
    );
  }

  if (type === "mostaql") {
    return (
      <span
        aria-hidden="true"
        className="font-black text-[19px] tracking-[-0.07em] leading-none"
      >
        م
      </span>
    );
  }

  return null;
});

// ============================================================
// DECORATIVE ELEMENT
// ============================================================

function MiniSticker({ children, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "absolute z-20 select-none pointer-events-none",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ============================================================
// LINK CARD (memoized — list item, avoids re-render on parent updates)
// ============================================================

const LinkCard = memo(function LinkCard({ item, index }) {
  const isYellow = item.accent === "yellow";
  const isBlue = item.accent === "blue";

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.name} — opens in a new tab`}
      className={[
        "group relative flex items-center justify-between gap-4",
        "w-full min-h-[68px] px-5 sm:px-6",
        "rounded-[22px] border-[2.5px] border-black dark:border-[#f8fafc]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:translate-x-[2px]",
        "active:translate-y-0",
        "shadow-[5px_5px_0_#111] dark:shadow-[5px_5px_0_#f8fafc]",
        isYellow
          ? "bg-[#F5E94E] text-[#111]"
          : isBlue
          ? "bg-[#0EA5E9] text-white"
          : "bg-white dark:bg-[#111] text-[#111] dark:text-white",
      ].join(" ")}
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={[
            "w-11 h-11 rounded-[14px] border-2 border-black dark:border-[#f8fafc]",
            "flex items-center justify-center shrink-0",
            isBlue
              ? "bg-white dark:bg-[#111] text-[#111] dark:text-white"
              : "bg-black dark:bg-[#f8fafc] text-white dark:text-black",
          ].join(" ")}
        >
          <SocialIcon type={item.type} size={22} />
        </div>

        <span className="text-[17px] sm:text-[18px] font-black tracking-[-0.03em]">
          {item.name}
        </span>
      </div>

      <div
        aria-hidden="true"
        className={[
          "w-9 h-9 rounded-full border-2 border-black dark:border-[#f8fafc]",
          "flex items-center justify-center shrink-0",
          "transition-transform duration-300 group-hover:rotate-45",
          isBlue
            ? "bg-white dark:bg-[#111] text-black dark:text-white"
            : "bg-[#F5E94E] text-black",
        ].join(" ")}
      >
        <ArrowUpRight size={18} strokeWidth={2.5} />
      </div>
    </a>
  );
});

// ============================================================
// MAIN PAGE
// ============================================================

export default function Links() {
  // Scroll to the very top whenever this page is reached (fresh visit or route change)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // Lightweight, dependency-free SEO tag injection (title, meta, canonical, JSON-LD)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    document.title = SEO.title;

    const setMeta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
      return tag;
    };

    const metaDescription = setMeta("name", "description", SEO.description);
    const ogTitle = setMeta("property", "og:title", SEO.title);
    const ogDescription = setMeta(
      "property",
      "og:description",
      SEO.description
    );
    const ogType = setMeta("property", "og:type", "profile");
    const ogUrl = setMeta("property", "og:url", SEO.url);
    const ogImage = setMeta("property", "og:image", SEO.image);
    const twitterCard = setMeta("name", "twitter:card", "summary_large_image");
    const twitterTitle = setMeta("name", "twitter:title", SEO.title);
    const twitterDescription = setMeta(
      "name",
      "twitter:description",
      SEO.description
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SEO.url);

    // Preconnect to the most-used external origins to speed up first click
    const preconnectHosts = [
      "https://www.linkedin.com",
      "https://www.upwork.com",
    ];
    const preconnectTags = preconnectHosts.map((href) => {
      let link = document.querySelector(
        `link[rel="preconnect"][href="${href}"]`
      );
      const created = !link;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "preconnect");
        link.setAttribute("href", href);
        link.setAttribute("crossorigin", "");
        document.head.appendChild(link);
      }
      return { link, created };
    });

    // JSON-LD structured data for richer search results
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mahmoud Fattah",
      jobTitle: ["Web Developer", "Content Creator", "Video Editor"],
      url: SEO.url,
      image: SEO.image,
      sameAs: [
        "https://www.linkedin.com/in/mahmoud-fattah-a541b0262/",
        "https://www.upwork.com/freelancers/~01d956de466f8bd67c",
        "https://mostaql.com/u/Mahmoud_Fattah1",
        "https://github.com/Mahmoudfattah",
        "https://www.instagram.com/mo__fattah",
      ],
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.title = previousTitle;
      document.head.removeChild(jsonLd);
      if (canonicalCreated && canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
      preconnectTags.forEach(({ link, created }) => {
        if (created && link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, []);

  return (
    <main className="animate-page-enter min-h-screen w-full overflow-hidden text-[#111] dark:text-[#f8fafc] transition-colors duration-300">
      {/* Page Animation Styles */}
      <style>
        {`
          @keyframes slideDownFade {
            from {
              opacity: 0;
              transform: translateY(-40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-page-enter {
            animation: slideDownFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      {/* GLOBAL WRAPPER */}
      <div className="relative mx-auto w-full px-4 sm:px-5">
        {/* ====================================================
            HERO
        ==================================================== */}
        <header className="relative">
          {/* Back Button */}
          <div className="mb-5 pt-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="
                inline-flex items-center justify-center w-10 h-10 
                rounded-full border-2 border-black dark:border-[#f8fafc] 
                bg-white dark:bg-[#111] text-black dark:text-white 
                shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#f8fafc] 
                transition-transform duration-300 hover:-translate-y-1 active:translate-y-0
              "
              aria-label="Go back"
            >
              <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          {/* Small top label */}
          <div className="flex items-center justify-between px-1 mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black dark:border-[#f8fafc] bg-white dark:bg-[#111] px-3 py-1.5 shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#f8fafc]">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-[#F5E94E] border border-black dark:border-[#f8fafc]"
              />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-black dark:text-white">
                Creative Digital Profile
              </span>
            </div>

            <div className="text-[11px] font-black tracking-widest" aria-hidden="true">
              MF / 01
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative min-h-[510px] sm:min-h-[560px]">
            {/* Yellow graphic block */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[5%]
                top-[8%]
                w-[78%]
                h-[73%]
                rounded-[42px]
                bg-[#F5E94E]
                border-[3px]
                border-black
                dark:border-[#f8fafc]
                rotate-[-3deg]
              "
            />

            {/* Blue block */}
            <div
              aria-hidden="true"
              className="
                absolute
                right-[3%]
                top-[17%]
                w-[29%]
                h-[43%]
                rounded-[36px]
                bg-[#0EA5E9]
                border-[3px]
                border-black
                dark:border-[#f8fafc]
                rotate-[8deg]
              "
            />

            {/* Decorative dots */}
            <MiniSticker className="left-[2%] top-[7%]">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-black dark:bg-white"
                  />
                ))}
              </div>
            </MiniSticker>

            {/* Star */}
            <MiniSticker className="right-[2%] top-[6%] rotate-[12deg]">
              <Star
                size={42}
                strokeWidth={2.8}
                className="fill-[#111] text-[#111] dark:fill-[#f8fafc] dark:text-[#f8fafc]"
              />
            </MiniSticker>

            {/* Question / creative bubble */}
            <MiniSticker className="right-[0%] top-[49%] rotate-[7deg]">
              <div className="flex items-center justify-center w-[74px] h-[74px] rounded-full bg-white dark:bg-[#111] border-[3px] border-black dark:border-[#f8fafc] shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#f8fafc]">
                <span className="text-4xl font-black text-black dark:text-white">
                  ?
                </span>
              </div>
            </MiniSticker>

            {/* Portrait — LCP element: eager + high priority, async decode */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[2%] w-[88%] sm:w-[86%] z-10">
              <img
                src="/src/assets/images/mahmoud-sketch.webp"
                alt="Illustrated portrait sketch of Mahmoud Fattah, web developer and content creator"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="
                  block
                  w-full
                  h-auto
                  object-contain
                  drop-shadow-[0_18px_0_rgba(17,17,17,0.12)]
                  dark:drop-shadow-[0_18px_0_rgba(255,255,255,0.1)]
                  select-none
                "
              />
            </div>

            {/* Small sticker */}
            <div
              aria-hidden="true"
              className="absolute z-30 left-[3%] bottom-[9%] rotate-[-7deg]"
            >
              <div className="rounded-[16px] bg-[#0EA5E9] text-white border-[3px] border-black dark:border-[#f8fafc] px-4 py-3 shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#f8fafc]">
                <div className="text-[10px] font-bold uppercase tracking-[0.17em]">
                  Creative
                </div>
                <div className="text-[15px] font-black leading-none mt-1">
                  + Digital
                </div>
              </div>
            </div>
          </div>

          {/* Main typography — single h1 for correct SEO heading hierarchy */}
          <div className="relative z-30 -mt-4">
            <h1 className="leading-[0.8]">
              <span className="block font-black text-[58px] sm:text-[68px] tracking-[-0.075em] uppercase">
                Mahmoud
              </span>

              <span className="flex items-end gap-3">
                <span className="font-black text-[58px] sm:text-[68px] tracking-[-0.075em] uppercase">
                  Fattah
                </span>

                <span
                  aria-hidden="true"
                  className="mb-2 sm:mb-3 rounded-full bg-[#0EA5E9] text-white border-2 border-black dark:border-[#f8fafc] px-3 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#f8fafc]"
                >
                  MF
                </span>
              </span>
            </h1>

            <p className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border-2 border-black dark:border-[#f8fafc] bg-white dark:bg-[#111] px-3 py-2 text-[11px] sm:text-xs font-black uppercase text-black dark:text-white">
                Web Developer
              </span>

              <span className="rounded-full border-2 border-black dark:border-[#f8fafc] bg-[#F5E94E] px-3 py-2 text-[11px] sm:text-xs font-black uppercase text-black">
                Content Creator
              </span>

              <span className="rounded-full border-2 border-black dark:border-[#f8fafc] bg-[#0EA5E9] text-white px-3 py-2 text-[11px] sm:text-xs font-black uppercase">
                Video Editor
              </span>

              <span className="rounded-full border-2 border-black dark:border-[#f8fafc] bg-white dark:bg-[#111] px-3 py-2 text-[11px] sm:text-xs font-black uppercase text-black dark:text-white">
                Motion Graphic
              </span>
            </p>
          </div>
        </header>

        {/* ====================================================
            STATS
        ==================================================== */}
        <section aria-label="Career stats" className="relative pb-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[26px] bg-[#111] dark:bg-white text-white dark:text-[#111] border-[3px] border-black dark:border-[#f8fafc] px-5 py-5 shadow-[5px_5px_0_#F5E94E]">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/60 dark:text-black/60">
                Projects
              </p>

              <div className="mt-1 text-[45px] sm:text-[50px] font-black tracking-[-0.07em] leading-none">
                43+
              </div>

              <p className="mt-2 text-xs font-bold text-white/70 dark:text-black/70">
                Successfully built
              </p>
            </div>

            <div className="rounded-[26px] bg-[#0EA5E9] text-white border-[3px] border-black dark:border-[#f8fafc] px-5 py-5 shadow-[5px_5px_0_#111] dark:shadow-[5px_5px_0_#f8fafc]">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/80">
                LinkedIn
              </p>

              <div className="mt-1 text-[45px] sm:text-[50px] font-black tracking-[-0.07em] leading-none">
                2K+
              </div>

              <p className="mt-2 text-xs font-bold text-white/85">
                Professional network
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            CV CTA
        ==================================================== */}
        <section aria-label="Download CV" className="pb-10">
          <a
            href="/Mahmoud-Fattah-CV.pdf"
            download
            aria-label="Download Mahmoud Fattah's CV as PDF"
            className="
              group
              relative
              flex
              items-center
              justify-between
              gap-4
              w-full
              min-h-[82px]
              rounded-[28px]
              border-[3px]
              border-black
              dark:border-[#f8fafc]
              bg-[#F5E94E]
              px-5
              sm:px-6
              shadow-[6px_6px_0_#111]
              dark:shadow-[6px_6px_0_#f8fafc]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[9px_9px_0_#111]
              dark:hover:shadow-[9px_9px_0_#f8fafc]
              text-black
            "
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-white dark:bg-[#111] border-2 border-black dark:border-[#f8fafc] flex items-center justify-center text-black dark:text-white">
                <Download size={23} strokeWidth={2.5} aria-hidden="true" />
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] font-black">
                  Available for work
                </div>

                <div className="text-[21px] font-black tracking-[-0.04em]">
                  Download My CV
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="w-11 h-11 rounded-full bg-black dark:bg-[#f8fafc] text-white dark:text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-45deg]"
            >
              <ArrowUpRight size={21} />
            </div>
          </a>
        </section>

        {/* ====================================================
            WORK WITH ME
        ==================================================== */}
        <nav aria-label="Professional links" className="pb-10">
          <div className="flex items-end justify-between mb-4 px-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-black/45 dark:text-[#f8fafc]/45">
                Professional
              </p>

              <h2 className="text-[31px] font-black tracking-[-0.065em] leading-none">
                Work With Me
              </h2>
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.14em]" aria-hidden="true">
              04 Links
            </span>
          </div>

          <ul className="space-y-4 list-none m-0 p-0">
            {professionalLinks.map((item, index) => (
              <li key={item.name}>
                <LinkCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </nav>

        {/* ====================================================
            PORTFOLIO FEATURE
        ==================================================== */}
        <section aria-label="Portfolio" className="pb-10">
          <div className="relative overflow-hidden rounded-[31px] border-[3px] border-black dark:border-[#f8fafc] bg-[#111] dark:bg-white text-white dark:text-[#111] px-6 py-7 shadow-[7px_7px_0_#0EA5E9]">
            <div
              aria-hidden="true"
              className="absolute right-[-25px] top-[-25px] w-[120px] h-[120px] rounded-full bg-[#F5E94E] border-[3px] border-black dark:border-[#f8fafc]"
            />

            <div
              aria-hidden="true"
              className="absolute left-[-25px] bottom-[-35px] w-[110px] h-[110px] rounded-full border-[3px] border-[#0EA5E9]"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full bg-[#F5E94E] text-black px-3 py-1.5 border-2 border-black dark:border-[#f8fafc] text-[10px] font-black uppercase tracking-[0.15em]">
                Portfolio
              </div>

              <div className="mt-7">
                <p className="text-[11px] text-white/55 dark:text-black/55 font-black uppercase tracking-[0.18em]">
                  More than
                </p>

                <div className="text-[74px] sm:text-[84px] font-black leading-[0.8] tracking-[-0.09em]">
                  43+
                </div>

                <h2 className="mt-3 text-[25px] font-black tracking-[-0.05em]">
                  Projects created.
                </h2>
              </div>

              <p className="mt-5 max-w-[310px] text-sm leading-6 text-white/65 dark:text-black/65">
                Websites, creative digital experiences, content and motion
                work built with a strong focus on design and performance.
              </p>

              <a
                href="https://mahmoudfattah.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Mahmoud Fattah's full portfolio — opens in a new tab"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  dark:bg-[#111]
                  text-black
                  dark:text-white
                  border-[3px]
                  border-black
                  dark:border-[#f8fafc]
                  px-5
                  py-3
                  font-black
                  text-sm
                  shadow-[4px_4px_0_#F5E94E]
                  transition-transform
                  hover:-translate-y-1
                "
              >
                View My Portfolio
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================
            DEVFLOW
        ==================================================== */}
        <nav aria-label="DevFlow social links" className="pb-10">
          <div className="relative overflow-hidden rounded-[31px] bg-[#F5E94E] border-[3px] border-black dark:border-[#f8fafc] px-5 py-6 shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#f8fafc] text-black">
            <div aria-hidden="true" className="absolute right-4 top-4 rotate-[8deg]">
              <div className="w-11 h-11 rounded-full bg-[#0EA5E9] border-2 border-black dark:border-[#f8fafc] flex items-center justify-center">
                <span className="text-white text-lg font-black">@</span>
              </div>
            </div>

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.18em] font-black">
                Creative Team
              </p>

              <h2 className="mt-1 text-[31px] font-black tracking-[-0.065em] leading-none">
                Follow DevFlow
              </h2>

              <p className="mt-2 text-xs font-bold max-w-[300px] leading-5 text-black/65">
                Follow the latest projects, experiments, designs and creative
                content.
              </p>

              <ul className="mt-6 space-y-3 list-none m-0 p-0">
                {devFlowLinks.map((item, index) => (
                  <li key={item.name}>
                    <LinkCard
                      item={{
                        ...item,
                        accent:
                          index === 1
                            ? "blue"
                            : index === 2
                            ? "white"
                            : "white",
                      }}
                      index={index}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ====================================================
            PERSONAL
        ==================================================== */}
        <nav aria-label="Personal links" className="pb-10">
          <div className="mb-4 px-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-black/45 dark:text-[#f8fafc]/45">
              Personal
            </p>

            <h2 className="text-[31px] font-black tracking-[-0.065em] leading-none">
              Stay Connected
            </h2>
          </div>

          <ul className="space-y-4 list-none m-0 p-0">
            {personalLinks.map((item, index) => (
              <li key={item.name}>
                <LinkCard
                  item={{
                    ...item,
                    accent: "white",
                  }}
                  index={index}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* ====================================================
            FINAL CTA
        ==================================================== */}
        <section aria-label="Contact" className="pb-12">
          <div className="relative rounded-[30px] border-[3px] border-black dark:border-[#f8fafc] bg-[#0EA5E9] text-white px-6 py-7 shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#f8fafc] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute right-[-15px] bottom-[-25px] text-[130px] font-black text-white/10 leading-none"
            >
              MF
            </div>

            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.18em] font-black text-white/70">
                Let's build something
              </p>

              <h2 className="mt-2 text-[40px] sm:text-[46px] font-black tracking-[-0.075em] leading-[0.9] max-w-[330px]">
                Have a project in mind?
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/75 max-w-[330px]">
                Let's turn your idea into something people remember.
              </p>

              <a
                href="https://wa.me/201223575572"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Mahmoud Fattah on WhatsApp — opens in a new tab"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#F5E94E]
                  text-black
                  border-[3px]
                  border-black
                  dark:border-[#f8fafc]
                  px-5
                  py-3
                  text-sm
                  font-black
                  shadow-[4px_4px_0_#111]
                  dark:shadow-[4px_4px_0_#f8fafc]
                  transition-all
                  hover:-translate-y-1
                "
              >
                Let's Talk
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================
            FOOTER
        ==================================================== */}
        <footer className="pb-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-[23px] font-black tracking-[-0.05em]">
              Mahmoud Fattah
            </p>

            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black/45 dark:text-[#f8fafc]/45">
              Web Developer • Content Creator • Video Editor
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}