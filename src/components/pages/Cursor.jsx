import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("pointermove", move);

    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <svg
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      style={{
        transform: "translate(-100px,-100px)",
      }}
    >
      <path
        d="M4 2L30 26L18 27L9 34L4 2Z"
        fill="#2F89D9"
        stroke="#202020"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}