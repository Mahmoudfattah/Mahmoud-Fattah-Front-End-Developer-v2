// import { motion } from "framer-motion";

// /**
//  * PageReveal — wraps the whole section stack.
//  *
//  * How it works:
//  * - `container` variants add `staggerChildren` so every direct <Reveal>
//  *   child animates one after another with a tiny, near-imperceptible delay
//  *   (0.06s) instead of all popping in at once.
//  * - Each <Reveal> child animates blur(12px) -> blur(0px) and
//  *   opacity 0 -> 1 with a slight upward drift, matching the screenshots:
//  *   background visible immediately (it's rendered outside/behind this,
//  *   untouched), then content sections sharpen top-to-bottom in sequence.
//  *
//  * Usage in App.jsx:
//  *
//  *   <PageReveal>
//  *     <Navbar />
//  *     <Navbar2 />
//  *     <Reveal><Hero /></Reveal>
//  *     <Reveal><ContributionCalendar /></Reveal>
//  *     <Background />
//  *     <Reveal><About /></Reveal>
//  *     <Reveal><LifeInSquares /></Reveal>
//  *     <Reveal><WorkExperience /></Reveal>
//  *     <Reveal><Education /></Reveal>
//  *     <Reveal><Skills /></Reveal>
//  *     <Reveal><Projects /></Reveal>
//  *     <Reveal>
//  *       <div ref={ref}>
//  *         <Suspense fallback={<div>Loading...</div>}>
//  *           <ContactBubbles />
//  *         </Suspense>
//  *       </div>
//  *     </Reveal>
//  *   </PageReveal>
//  *
//  * Only wrap the pieces you actually want to take part in the reveal —
//  * Navbar/Navbar2/Background are intentionally left OUT of the example
//  * above since they should feel instantly present (chrome + background),
//  * not part of the "content loading in" wave. Wrap them too if you want
//  * them included.
//  */

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       // The tiny stagger IS the wave effect — keep this small.
//       staggerChildren: 0.06,
//       delayChildren: 0.05,
//     },
//   },
// };

// const revealVariants = {
//   hidden: {
//     opacity: 0,
//     filter: "blur(14px)",
//     y: 14,
//   },
//   visible: {
//     opacity: 1,
//     filter: "blur(0px)",
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// export function PageReveal({ children, className = "" }) {
//   return (
//     <motion.div
//       className={className}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {children}
//     </motion.div>
//   );
// }

// export function Reveal({ children, className = "" }) {
//   return (
//     <motion.div className={className} variants={revealVariants} style={{ willChange: "opacity, filter, transform" }}>
//       {children}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";

/**
 * PageReveal — kept only as a plain wrapper now (no stagger timing lives
 * here anymore). It exists so App.jsx doesn't need to change its markup
 * shape, but it's just a <div>.
 *
 * WHY THE OLD VERSION FELT "ALL AT ONCE":
 * The previous version staggered every section together on page MOUNT.
 * On a long single-page layout, most sections sit below the fold, so
 * their entire animation (under ~1s total) finished long before the user
 * scrolled down to see it — by the time they scrolled, everything was
 * already fully visible, so it looked like nothing happened. Animating
 * `filter: blur()` on several large sections simultaneously is also GPU
 * heavy, which caused dropped frames (jank) and made the motion feel
 * like a jump-cut instead of smooth.
 *
 * THE FIX:
 * Each <Reveal> now triggers ITS OWN animation the moment it scrolls
 * into view (`whileInView`), independently, `once: true` so it doesn't
 * replay. This means:
 *  - Sections above the fold reveal immediately on load (Hero, etc.)
 *  - Sections below the fold reveal exactly when you scroll to them —
 *    always visible, always smooth, no timing race with scroll speed.
 *  - Only ONE section is ever animating blur at a time in practice
 *    (maybe two, at a boundary), so no simultaneous-blur jank.
 */

export function PageReveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 24 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "opacity, filter, transform" }}
    >
      {children}
    </motion.div>
  );
}