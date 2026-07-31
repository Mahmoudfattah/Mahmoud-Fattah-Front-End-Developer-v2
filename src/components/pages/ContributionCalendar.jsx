// import { useMemo } from "react";
// import { ActivityCalendar } from "react-activity-calendar";
// import { useTheme } from "../../context/ThemeContext";

// function seededRandom(seed) {
//   let s = seed;

//   return () => {
//     s = (s * 1103515245 + 12345) & 0x7fffffff;
//     return s / 0x7fffffff;
//   };
// }

// function levelFromCount(count) {
//   if (count === 0) return 0;
//   if (count <= 2) return 1;
//   if (count <= 4) return 2;
//   if (count <= 7) return 3;
//   return 4;
// }

// function generateData() {
//   const rand = seededRandom(42);

//   const days = 365;
//   const today = new Date();
//   const start = new Date(today);

//   start.setDate(start.getDate() - (days - 1));

//   const raw = [];

//   for (let i = 0; i < days; i++) {
//     const date = new Date(start);
//     date.setDate(start.getDate() + i);

//     const dow = date.getDay();
//     const isWeekend = dow === 0 || dow === 6;

//     const idleChance = isWeekend ? 0.28 : 0.08;

//     let count = 0;

//     if (rand() > idleChance) {
//       const base = isWeekend ? rand() * 3 : rand() * 4.5;
//       const burst = rand() > 0.93 ? rand() * 6 : 0;

//       count = Math.round(base + burst);
//     }

//     raw.push({
//       date: date.toISOString().slice(0, 10),
//       count,
//       level: 0,
//     });
//   }

//   const currentTotal = raw.reduce((sum, d) => sum + d.count, 0);
//   const target = 560 + Math.round(rand() * 40);
//   const scale = target / currentTotal;

//   let runningTotal = 0;

//   const data = raw.map((d) => {
//     const count = Math.round(d.count * scale);
//     runningTotal += count;

//     return {
//       ...d,
//       count,
//       level: levelFromCount(count),
//     };
//   });

//   return {
//     data,
//     total: runningTotal,
//   };
// }

// function getThemeColors() {
//   const styles = getComputedStyle(document.documentElement);

//   return {
//     light: [
//       "#ebedf0",
//       styles.getPropertyValue("--color-bg-secondary").trim() || "#bae6fd",
//       styles.getPropertyValue("--color-primary-dark").trim() || "#0284c7",
//       styles.getPropertyValue("--color-primary").trim() || "#0ea5e9",
//       styles.getPropertyValue("--color-primary-light").trim() || "#38bdf8",
//     ],

//     dark: [
//       "#161b22",
//       styles.getPropertyValue("--color-second-dark").trim() || "#1a4a4a",
//       styles.getPropertyValue("--color-primary-dark").trim() || "#139ecf",
//       styles.getPropertyValue("--color-primary").trim() || "#3fc3ff",
//       styles.getPropertyValue("--color-primary-light").trim() || "#66d9ff",
//     ],
//   };
// }

// export default function ContributionsCalendar() {
//   const { isDark } = useTheme();

//   const { data, total } = useMemo(() => generateData(), []);

//   const themeColors = useMemo(() => getThemeColors(), [isDark]);

//   return (
//     <>
//       <style>
//         {`
//           .calendar-scroll::-webkit-scrollbar {
//             display: none;
//           }

//           .calendar-scroll {
//             overflow-x: auto;
//             scrollbar-width: none;
//             -ms-overflow-style: none;
//           }
//         `}
//       </style>

//       <div className="sticky top-4 z-20 w-full">
//         <div
//           className="rounded-2xl border border-[var(--border-color)] bg-[var(--color-bg-projects)]/90 px-4 py-4 shadow-sm backdrop-blur-sm"
//           style={{ color: "var(--color-text)" }}
//         >
//           <div className="mb-3 flex items-center justify-between gap-2">
//             <span
//               className="text-[11px] font-semibold uppercase tracking-[0.2em]"
//               style={{ color: "var(--color-muted)" }}
//             >
//               Activity
//             </span>
//             <span
//               className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
//               style={{
//                 backgroundColor: "var(--color-bg-secondary)",
//                 color: "var(--color-primary)",
//               }}
//             >
//               {total} contributions in the last year
//             </span>
//           </div>

//           <div
//             className="calendar-scroll w-full overflow-x-auto lg:overflow-x-hidden"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             <div className="min-w-max">
//               <ActivityCalendar
//                 data={data}
//                 colorScheme={isDark ? "dark" : "light"}
//                 theme={themeColors}
//                 fontSize={14}
//                 blockSize={12}
//                 blockMargin={4}
//                 style={{ color: "var(--color-text)" }}
//                 labels={{
//                   totalCount: `${total} contributions in the last year`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useMemo } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "../../context/ThemeContext";

function seededRandom(seed) {
  let s = seed;

  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function levelFromCount(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function generateData() {
  const rand = seededRandom(42);

  const days = 365;
  const today = new Date();
  const start = new Date(today);

  start.setDate(start.getDate() - (days - 1));

  const raw = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dow = date.getDay();
    const isWeekend = dow === 0 || dow === 6;

    const idleChance = isWeekend ? 0.28 : 0.08;

    let count = 0;

    if (rand() > idleChance) {
      const base = isWeekend ? rand() * 3 : rand() * 4.5;
      const burst = rand() > 0.93 ? rand() * 6 : 0;

      count = Math.round(base + burst);
    }

    raw.push({
      date: date.toISOString().slice(0, 10),
      count,
      level: 0,
    });
  }

  const currentTotal = raw.reduce((sum, d) => sum + d.count, 0);
  const target = 560 + Math.round(rand() * 40);
  const scale = target / currentTotal;

  let runningTotal = 0;

  const data = raw.map((d) => {
    const count = Math.round(d.count * scale);
    runningTotal += count;

    return {
      ...d,
      count,
      level: levelFromCount(count),
    };
  });

  return {
    data,
    total: runningTotal,
  };
}

function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);

  return {
    light: [
      "#ebedf0",
      styles.getPropertyValue("--color-bg-secondary").trim() || "#bae6fd",
      styles.getPropertyValue("--color-primary-dark").trim() || "#0284c7",
      styles.getPropertyValue("--color-primary").trim() || "#0ea5e9",
      styles.getPropertyValue("--color-primary-light").trim() || "#38bdf8",
    ],

    dark: [
      "#161b22",
      styles.getPropertyValue("--color-second-dark").trim() || "#1a4a4a",
      styles.getPropertyValue("--color-primary-dark").trim() || "#139ecf",
      styles.getPropertyValue("--color-primary").trim() || "#3fc3ff",
      styles.getPropertyValue("--color-primary-light").trim() || "#66d9ff",
    ],
  };
}

export default function ContributionsCalendar() {
  const { isDark } = useTheme();

  const { data, total } = useMemo(() => generateData(), []);

  const themeColors = useMemo(() => getThemeColors(), [isDark]);

  return (
    <>
      <style>
        {`
          .calendar-scroll::-webkit-scrollbar {
            display: none;
          }

          .calendar-scroll {
            overflow-x: auto; /* أو scroll، حسب اللي عندك */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge القديم */
          }
        `}
      </style>

      <div
        className="calendar-scroll w-full overflow-x-auto lg:overflow-x-hidden"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="min-w-max">
          <ActivityCalendar
            data={data}
            colorScheme={isDark ? "dark" : "light"}
            theme={themeColors}
            fontSize={14}
            blockSize={12}
            blockMargin={4}
            style={{
              color: "var(--color-text)",
            }}
            labels={{
              totalCount: `${total} contributions in the last year`,
            }}
          />
        </div>
      </div>
    </>
  );
}
