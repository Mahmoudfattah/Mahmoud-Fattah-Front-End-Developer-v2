// 📁 components/animations/MotionPresets.jsx

import { motion } from "framer-motion";

// ✅ Preset: Fade In
export const FadeIn = ({ children, duration = 0.6, delay = 0, ...rest }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);
// ✅ Fade In (مستخدم)
export const FadeI = ({ children, duration = 2.5, delay = 0.5, ...rest }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay, ease: "easeInOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Slide Up
export const SlideUp = ({ children, duration = 3.7, delay = .5, distance = 50, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);
// ✅ Slide Down (مستخدم)
export const SlideDown = ({ children, duration = 2.5, delay = 0.5, distance = -30, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeInOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Slide Left
export const SlideLeft = ({ children, duration = 0.6, delay = 0, distance = 50, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, x: distance }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Slide Right
export const SlideRight = ({ children, duration = 0.6, delay = 0, distance = 50, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, x: -distance }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);
// ✅ Slide Right (مستخدم كـ SlideR)
export const SlideR = ({ children, duration = 2.6, delay = 0.5, distance = 30, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, x: -distance }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeInOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Slide Left (مستخدم كـ Slidel)
export const Slidel = ({ children, duration = 2.6, delay = 0.5, distance = 30, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, x: distance }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeInOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Zoom In (مستخدم)
export const ZoomIn = ({ children, duration = 2.7, delay = 0.5, scaleFrom = 0.8, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, scale: scaleFrom }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay, ease: "easeInOut" }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Rotate on Hover
export const RotateHover = ({ children, rotateDeg = 10, ...rest }) => (
  <motion.div whileHover={{ rotate: rotateDeg }} {...rest}>
    {children}
  </motion.div>
);

// ✅ Preset: Scale on Hover
export const ScaleHover = ({ children, scaleTo = 1.05, ...rest }) => (
  <motion.div whileHover={{ scale: scaleTo }} {...rest}>
    {children}
  </motion.div>
);

// ✅ Preset: Bounce In
export const BounceIn = ({ children, delay = 0, ...rest }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: [1.2, 0.95, 1.05, 1] }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Infinite Scroll (Y axis)
export const InfiniteY = ({ children, duration = 2, ...rest }) => (
  <motion.div
    animate={{ y: [0, -20, 0] }}
    transition={{ repeat: Infinity, duration }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Fade In on Viewport
export const FadeInOnView = ({ children, duration = 0.6, delay = 0, ...rest }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Stagger Container
export const StaggerContainer = ({ children, stagger = 0.2, delay = 0, ...rest }) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Staggered Item
export const StaggerItem = ({ children, fromY = 20, duration = 0.5, delay = 0, ...rest }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: fromY },
      show: { opacity: 1, y: 0, transition: { duration, delay } },
    }}
    {...rest}
  >
    {children}
  </motion.div>
);

// ✅ Preset: Scroll Snapping Section (Y)
export const SnapSectionY = ({ children, ...rest }) => (
  <section
    style={{ scrollSnapAlign: "start", height: "100vh", overflow: "hidden" }}
    {...rest}
  >
    {children}
  </section>
);

// ✅ Preset: Scroll Snapping Section (X)
export const SnapSectionX = ({ children, ...rest }) => (
  <section
    style={{ scrollSnapAlign: "center", width: "100vw", height: "100vh", display: "inline-block" }}
    {...rest}
  >
    {children}
  </section>
);
