import { useEffect, useRef } from "react";

// Background.jsx — mount this ONCE near the root of your app (e.g. in App.jsx,
// as the first child, before your sections) so it sits behind everything.
//
// Your CSS vars (--color-text, --color-bg) are plain hex, not HSL components,
// so `hsl(var(--foreground) / .05)` can't be used directly. `color-mix()`
// gives the exact same "tinted transparent" effect without needing to
// re-split your palette into H/S/L numbers.

function GridPattern() {
  return (
    <div
      className="pointer-events-none fixed inset-0  -z-10 h-[100dvh] w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        backgroundImage: [
          "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-text) 5%, transparent) 1px, transparent 0)",
          "linear-gradient(color-mix(in srgb, var(--color-text) 3%, transparent) 1px, transparent 0)",
          "linear-gradient(90deg, color-mix(in srgb, var(--color-text) 3%, transparent) 1px, transparent 0)",
        ].join(", "),
        backgroundSize: "40px 40px, 20px 20px, 20px 20px",
      }}
    />
  );
}

function GrainCanvas({ opacity = 0.05 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w;
      canvas.height = h;

      const imageData = ctx.createImageData(w, h);
      const buffer = imageData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 255;
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = Math.random() * 255 * opacity;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[100dvh] w-screen mix-blend-overlay"
    />
  );
}

export default function Background() {
  return (
    <>
      <GridPattern />
      <GrainCanvas />
    </>
  );
}