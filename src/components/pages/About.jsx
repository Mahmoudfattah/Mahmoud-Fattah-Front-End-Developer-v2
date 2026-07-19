 import React, { useState, useEffect  } from 'react';
 import { motion } from 'framer-motion';
// import img1 from '../../assets/images/img1.webp';
// import line from '../../assets/images/line.webp';
 import UseAnimations from 'react-useanimations';
 import download from 'react-useanimations/lib/download';
// import RotatingText from '../RotatingText';
 import ReactGA from "react-ga4";



export default function About() { 
    const [cvClicked, setCvClicked] = useState(false);

  useEffect(() => {
    if (cvClicked) {
      const timeout = setTimeout(() => {
        setCvClicked(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [cvClicked]);
  return (
    <section id="about" className="w-full ">
      <h2
        className="text-xl font-bold"
        style={{ color: "var(--color-text)" }}
      >
        About
      </h2>

      <div
        className="excon space-y-3 text-sm leading-1"
        style={{ color: "var(--text-gray)" }}
      >
       <p>
  I&apos;m a{" "}
  <span className="font-semibold" style={{ color: "var(--color-text)" }}>
    Front-End Engineer
  </span>{" "}
  with{" "}
  <span className="font-semibold" style={{ color: "var(--color-text)" }}>
    1+ year of production experience
  </span>{" "}
  building scalable, high-performance web applications. I specialize in{" "}
  <a
    href="#skills"
    className="font-medium underline underline-offset-2"
    style={{ color: "var(--color-text)" }}
  >
    React
  </a>
  ,{" "}
  <a
    href="#skills"
    className="font-medium underline underline-offset-2"
    style={{ color: "var(--color-text)" }}
  >
    Next.js
  </a>
  , and{" "}
  <a
    href="#skills"
    className="font-medium underline underline-offset-2"
    style={{ color: "var(--color-text)" }}
  >
    TypeScript
  </a>
  , with a strong focus on performance, accessibility, and clean, maintainable
  code.
</p>

<p>
  I&apos;m currently expanding my expertise in{" "}
  <span className="font-semibold" style={{ color: "var(--color-text)" }}>
    GSAP
  </span>
  ,{" "}
  <span className="font-semibold" style={{ color: "var(--color-text)" }}>
    Framer Motion
  </span>
  , and{" "}
  <a
    href="#skills"
    className="font-medium underline underline-offset-2"
    style={{ color: "var(--color-text)" }}
  >
    Matter.js
  </a>{" "}
  to craft immersive, interactive user experiences, while strengthening my
  backend skills with{" "}
  <a
    href="#skills"
    className="font-medium underline underline-offset-2"
    style={{ color: "var(--color-text)" }}
  >
    Node.js
  </a>{" "}
  as I grow into full-stack development.
</p>

<p>
  I hold a{" "}
  <span className="font-semibold" style={{ color: "var(--color-text)" }}>
    B.Sc. in Information Systems
  </span>{" "}
  from Helwan University&apos;s Faculty of Computers &amp; AI. Learn more
  about my experience in my{" "}
   <span className="inline-flex items-center  align-middle">
               {!cvClicked ? (
               <a
                        onClick={() => {
                          setCvClicked(true);

//                           // 👇 تتبع تحميل السيرة الذاتية
                         ReactGA.event({
                         category: "Download",
                           action: "Downloaded CV",
                           label: "Mahmoud Fattah CV"
                            
                         });
                         }}
                         href='/my-cv.pdf'
                         download='Mahmoud Fattah CV'
                         aria-label="download CV"
                         className="
                         text-[#139ecf] cursor-pointer uppercase border-b-2
                         border-[#139ecf]"
                       >
                     CV
                   </a>
                 ) : (
                   <UseAnimations
                     animation={download}
                     size={32}
                     strokeColor="#139ecf"
                     autoplay
                     loop={false}
                   />
                 )}
               </span>
  .
</p>
      </div>
    </section>
  );
}