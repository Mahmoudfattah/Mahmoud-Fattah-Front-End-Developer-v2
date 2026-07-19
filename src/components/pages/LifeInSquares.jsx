// Section 4/8 — Life in Squares
// grid-cols-2 sm:grid-cols-3 md:grid-cols-4, auto-rows-[150px] md:auto-rows-[120px]
// each tile has its own responsive col/row span; object-cover fills each cell;
// lg:hover:scale-105 only (avoids sticky hover on touch)

const photos = [
  { id: 1, span: "col-span-2 md:row-span-2", src: '/Lifeinsequares/25.webp', style: { objectPosition: '0px -70px' } },
  { id: 2, span: "md:col-span-1", src: '/Lifeinsequares/17.webp' },
  { id: 3, span: "md:col-span-1", src: '/Lifeinsequares/7.webp' },
  { id: 4, span: "md:col-span-1 row-span-2", src: '/Lifeinsequares/2.webp' },
  { id: 5, span: "md:col-span-1 row-span-1 md:row-span-2", src: '/Lifeinsequares/3.webp' },
  { id: 6, span: "md:col-span-1 row-span-2", src: '/Lifeinsequares/4.webp' },
  { id: 7, span: "md:col-span-1 md:row-span-2", src: '/Lifeinsequares/10.webp' },
  { id: 8, span: "col-span-2", src: '/Lifeinsequares/6.webp' },
];

function PhotoTile({ photo }) {
  return (
    <div
      tabIndex={0}
      className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer min-h-0 ${photo.span}`}
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt="Life in Squares"
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full min-h-0 object-cover transition-transform duration-300 ease-in-out lg:hover:scale-105"
          style={photo.style}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center transition-transform duration-300 lg:hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--color-bg-secondary), var(--color-second-dark))" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-muted)" }}>
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m4 17 5-5 3 3 4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function LifeInSquares() {
  return (
    <section id="life-in-squares" className="w-full  pb-2 sm:pb-0 ">
      <h2 className="mb-1 text-xl font-bold" style={{ color: "var(--color-text)" }}>
        Life in Squares
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[120px] gap-2 pt-2">
        {photos.map((photo) => (
          <PhotoTile key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}