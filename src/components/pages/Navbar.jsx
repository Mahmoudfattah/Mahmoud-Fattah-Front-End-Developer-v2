import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom"; // <-- NEW: Added React Router Link
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/* =========================================================
   CONFIG — tune the whole dock's feel from these constants
========================================================= */

const BASE_SIZE = 34;
const MAGNIFY_RANGE = 150;
const LIFT_MAX = 12;
const ROTATE_MAX = 6;

const NAV_HEIGHT = 52;
const NAV_PAD_X = 14;
const NAV_PAD_X_HOVER = 22;

const BG_LIGHT = "#e5e5e5";
const BG_DARK = "#08090A";

const ICON_SPRING = { mass: 0.12, stiffness: 260, damping: 20 };
const CONTAINER_SPRING = { mass: 0.3, stiffness: 200, damping: 24 };
const TOOLTIP_TRANSITION = {
  type: "spring",
  mass: 0.3,
  stiffness: 500,
  damping: 30,
};
const BG_TRANSITION = {
  type: "spring",
  mass: 0.2,
  stiffness: 500,
  damping: 30,
};

// ---- Raw SVG icons (kept exactly as-is, no icon library) --------------
const HomeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const BlogIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 text-blue-500"
  >
    <path d="M2 6h4"></path>
    <path d="M2 10h4"></path>
    <path d="M2 14h4"></path>
    <path d="M2 18h4"></path>
    <rect width="16" height="20" x="4" y="2" rx="2"></rect>
    <path d="M16 2v20"></path>
  </svg>
);

const GithubIcon = (
  <svg
    viewBox="0 0 438.549 438.549"
    className="size-4 transition-transform duration-200 hover:scale-110"
  >
    <path
      fill="currentColor"
      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
    ></path>
  </svg>
);

const WhatsappIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    className="size-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
  </svg>
);

const LinkedinIcon = (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 transition-transform duration-200 hover:scale-110"
  >
    <title>LinkedIn</title>
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    ></path>
  </svg>
);

const UpworkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    className="size-4 transition-transform duration-200 hover:scale-110"
  >
    <path
      fill="#14A800"
      d="M1 9a1 1 0 0 0-1 1v14.115c0 6.161 4.683 11.516 10.834 11.865 5.897.334 10.914-3.804 11.963-9.33q.856 1.156 1.734 2.143l-3.529 14.978c-.069.298 0 .61.19.85.19.238.479.379.785.379h5.119a.99.99 0 0 0 .97-.764l2.477-10.45.91.526C33.618 35.435 35.815 36 38 36c7.192 0 12.926-6.359 11.875-13.75-.696-4.896-4.46-8.932-9.295-9.973a12.045 12.045 0 0 0-13.387 6.467s-.258.575-.466 1.149c-1.65-2.846-2.62-5.799-3.127-7.938-.185-.78-.463-2.192-.495-2.283A1 1 0 0 0 22.162 9H17a1 1 0 0 0-1 1v14.3c0 2.35-1.713 4.45-4.05 4.679A4.505 4.505 0 0 1 7 24.5V10a1 1 0 0 0-1-1zm37 10c2.757 0 5 2.243 5 5s-2.243 5-5 5c-2.225 0-4.286-1.342-5.73-2.512l.886-3.74A5 5 0 0 1 38 19"
    ></path>
  </svg>
);

const EmailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 transition-transform duration-200 hover:scale-110"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const MoonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[1.2rem] w-[1.2rem]"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

const SunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[1.2rem] w-[1.2rem]"
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

// ---- Data ----------------------------------------------------------
// 4. NEW: Updated href paths for internal routing
const navLinks = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "Network & Links", label: "Network & Links", href: "/blog", icon: BlogIcon }, 
];

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Mahmoudfattah",
    icon: GithubIcon,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/201223575572",
    icon: WhatsappIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahmoud-fattah-a541b0262/",
    icon: LinkedinIcon,
  },
  {
    id: "upwork",
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01d956de466f8bd67c?mp_source=share",
    icon: UpworkIcon,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:mahmoudfattahdeveloper@gmail.com?subject=Let's%20Connect",
    icon: EmailIcon,
  },
];

function Divider() {
  return (
    <div
      role="none"
      className="mx-1 h-7 w-px shrink-0"
      style={{ backgroundColor: "var(--nav-border)" }}
    />
  );
}

/**
 * A single dock icon.
 */
function DockIcon({ mouseX, item, isExternal = true, recalcKey }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, [recalcKey]);

  const distance = useTransform(mouseX, (val) => {
    const bounds = rectRef.current;
    if (!bounds) return MAGNIFY_RANGE;
    return val - (bounds.x + bounds.width / 2);
  });

  const falloff = useTransform(distance, (d) => {
    const clamped = Math.max(-MAGNIFY_RANGE, Math.min(MAGNIFY_RANGE, d));
    return Math.cos((clamped / MAGNIFY_RANGE) * (Math.PI / 2));
  });

  const liftSync = useTransform(falloff, (f) =>
    shouldReduceMotion ? 0 : -LIFT_MAX * f,
  );
  const lift = useSpring(liftSync, ICON_SPRING);

  const rotateSync = useTransform([distance, falloff], ([d, f]) => {
    if (shouldReduceMotion) return 0;
    const sign = d < 0 ? -1 : 1;
    return sign * ROTATE_MAX * f;
  });
  const rotate = useSpring(rotateSync, ICON_SPRING);

  // 5. NEW: The inner animated content, separated so we can easily swap between <a> and <Link>
  const IconContent = (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full p-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-text)]"
      style={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        y: lift,
        rotate,
        willChange: "transform",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              backgroundColor: "var(--nav-hover)",
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={BG_TRANSITION}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute -top-9 left-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium shadow-lg semibold"
            style={{
              backgroundColor:
                item.id === "Network & Links" ? "#50A2FF" : "var(--nav-text)",
              color: item.id === "Network & Links" ? "#fff" : "var(--nav-bg)",
              fontWeight: item.id === "Network & Links" ? "bold" : "semibold",
            }}
            initial={{ opacity: 0, y: 4, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 4, x: "-50%", scale: 0.9 }}
            transition={TOOLTIP_TRANSITION}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        className="relative flex h-full w-full items-center justify-center"
        style={{ color: "var(--nav-text)" }}
      >
        {item.icon}
      </motion.span>
    </motion.div>
  );

  // 6. NEW: Conditionally render React Router <Link> or standard <a>
  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={item.label}
        className="relative flex aspect-square items-center justify-center outline-none"
      >
        {IconContent}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      aria-label={item.label}
      className="relative flex aspect-square items-center justify-center outline-none"
    >
      {IconContent}
    </Link>
  );
}

export default function Navbar() {
  const mouseX = useMotionValue(Infinity);
  const { isDark, toggleTheme } = useTheme();

  const [recalcKey, setRecalcKey] = useState(0);

  useEffect(() => {
    const onResize = () => setRecalcKey((k) => k + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const hoverProgress = useMotionValue(0);
  const hoverSpring = useSpring(hoverProgress, CONTAINER_SPRING);
  const paddingX = useTransform(
    hoverSpring,
    [0, 1],
    [NAV_PAD_X, NAV_PAD_X_HOVER],
  );
  const breathe = useTransform(hoverSpring, [0, 1], [1, 1.015]);

  const handlePointerEnter = useCallback(() => {
    hoverProgress.set(1);
    setRecalcKey((k) => k + 1);
  }, [hoverProgress]);

  const handlePointerLeave = useCallback(() => {
    hoverProgress.set(0);
    mouseX.set(Infinity);
  }, [hoverProgress, mouseX]);

  return (
    <nav className="pointer-events-none fixed bottom-[5px] left-1/2 z-50 hidden -translate-x-1/2 sm:flex">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        className="pointer-events-auto relative mx-auto flex items-center gap-1 overflow-visible rounded-full border"
        style={{
          height: NAV_HEIGHT,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: 6,
          paddingBottom: 6,
          scale: breathe,
          willChange: "transform",
          "--nav-bg": isDark ? BG_DARK : BG_LIGHT,
          "--nav-text": isDark ? BG_LIGHT : BG_DARK,
          "--nav-border": isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)",
          "--nav-hover": "color-mix(in srgb, var(--nav-bg), #000 14%)",
          backgroundColor: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          boxShadow: isDark
            ? "0 -20px 80px -20px #ffffff1f inset"
            : "0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 12px 24px rgba(0,0,0,.05)",
        }}
      >
        {navLinks.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            item={item}
            isExternal={false}
            recalcKey={recalcKey}
          />
        ))}

        <Divider />

        {socialLinks.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            item={item}
            recalcKey={recalcKey}
          />
        ))}

        <Divider />

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={`Toggle theme (current: ${isDark ? "Dark" : "Light"})`}
          onClick={toggleTheme}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-2 transition-colors duration-150 hover:bg-[var(--nav-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-text)]"
          style={{ color: "var(--nav-text)" }}
        >
          {isDark ? SunIcon : MoonIcon}
        </button>
      </motion.div>
    </nav>
  );
}