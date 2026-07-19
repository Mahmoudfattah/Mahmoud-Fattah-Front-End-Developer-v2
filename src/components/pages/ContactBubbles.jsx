import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";
import Linkin from "../../assets/images/v1.webm";
import Linkin2 from "../../assets/images/v2.webm";
import Linkin3 from "../../assets/images/v3.webm";
import UseAnimations from "react-useanimations";
import linkedin from "react-useanimations/lib/linkedin";
import github from "react-useanimations/lib/github";
import instagram from "react-useanimations/lib/instagram";
import mail from "react-useanimations/lib/mail";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const getResponsiveSize = (width) => {
  if (width >= 1200) return 1;
  if (width >= 992) return 0.85;
  if (width >= 768) return 0.7;
  if (width >= 576) return 0.55;
  return 0.4;
};

const bubblesData = [
  {
    id: 5,
    text: "Send a message",
    bg: "#22d3ee",
    type: "rectangle",
    baseWidth: 580,
    baseHeight: 100,
    borderRadius: 49,
  },
];

// Small hover-to-play video preview. Videos play infinitely once hovered.
function HoverPreviewVideo({ src, className }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback speed to 1.5x
    video.playbackRate = 1.5;

    // Find the parent container with opacity transitions
    let container = video.parentElement;
    if (!container) return;

    const checkAndPlay = () => {
      const style = window.getComputedStyle(container);
      const opacity = parseFloat(style.opacity);

      // Play if container is visible (opacity > 0.5)
      if (opacity > 0.5) {
        video.play().catch(() => {
          // Autoplay blocked — will retry on next check
        });
      } else {
        video.pause();
      }
    };

    // Check immediately
    checkAndPlay();

    // Set up periodic checks for opacity changes
    const interval = setInterval(checkAndPlay, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

export default function ContactBubbles() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleBodies, setBubbleBodies] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectGoals, setProjectGoals] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const prefersReducedMotion = useReducedMotion();

  // Physics engine internals live in refs, not state. They previously
  // lived in state (setEngine/setRender), which meant the cleanup
  // function of the init effect always closed over the *initial* null
  // values instead of the real instances — so the engine/renderer was
  // never actually torn down. Refs are always current.
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const rafIdRef = useRef(null);
  const modalTitleId = "contact-modal-title";

  const services = [
    "Landing Pages",
    "Web Apps",
    "Portfolio Sites",
    "i18n",
    "Deployment & Hosting",
    "Website Development",
    "SPA",
    "Figma to Code",
  ];

  const budgets = ["Under $100", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k+"];

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setScaleFactor(getResponsiveSize(width));
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 },
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => {
      if (sceneRef.current) observer.unobserve(sceneRef.current);
    };
  }, []);

  // Physics init — runs ONCE when the section first becomes visible, not
  // on every resize. Re-running this on every scaleFactor change was the
  // source of the leak: each run created a fresh engine/world without
  // ever tearing down the previous one. Trade-off: bubble sizing is now
  // locked to the scaleFactor at first reveal rather than live-rescaling
  // while you resize — acceptable for a physics toy, and avoids the leak.
  useEffect(() => {
    if (!isVisible || !sceneRef.current || scaleFactor === 0) return;

    let cancelled = false;

    const initMatterJS = () => {
      if (cancelled || !sceneRef.current || !canvasRef.current) return;
      const Matter = window.Matter;
      const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } =
        Matter;

      const engine = Engine.create();
      const width = sceneRef.current.clientWidth;
      const height = sceneRef.current.clientHeight;
      engine.world.gravity.y = 0.8;

      const render = Render.create({
        element: sceneRef.current,
        canvas: canvasRef.current,
        engine,
        options: {
          width,
          height,
          background: "transparent",
          wireframes: false,
        },
      });

      const bodies = bubblesData.map((bubble, index) => {
        const x = width / 2 + (Math.random() - 0.5) * 200 * scaleFactor;
        const y = 50 + index * 100 * scaleFactor;

        const commonProps = {
          restitution: 0.7,
          friction: 0.001,
          frictionAir: 0.01,
          render: { fillStyle: bubble.bg },
        };

        const body =
          bubble.type === "circle"
            ? Bodies.circle(
                x,
                y,
                (bubble.baseRadius || 80) * scaleFactor,
                commonProps,
              )
            : Bodies.rectangle(
                x,
                y,
                (bubble.baseWidth || 200) * scaleFactor,
                (bubble.baseHeight || 120) * scaleFactor,
                {
                  ...commonProps,
                  chamfer: { radius: (bubble.borderRadius || 0) * scaleFactor },
                },
              );

        body.bubbleData = bubble;
        return body;
      });

      setBubbleBodies(bodies);

      const ground = Bodies.rectangle(width / 2, height - 60, width, 40, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });
      const leftWall = Bodies.rectangle(20, height / 2, 40, height, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });
      const rightWall = Bodies.rectangle(width - 20, height / 2, 40, height, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });
      const ceiling = Bodies.rectangle(width / 2, 20, width, 40, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });

      World.add(engine.world, [
        ...bodies,
        ground,
        leftWall,
        rightWall,
        ceiling,
      ]);

      render.canvas.style.pointerEvents = "auto";
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      engineRef.current = engine;
      renderRef.current = render;
      runnerRef.current = runner;
    };

    // Only inject the CDN script once — previously a new <script> tag
    // was appended on every resize, and window.Matter was reloaded
    // redundantly each time.
    if (window.Matter) {
      initMatterJS();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js";
      script.onload = initMatterJS;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      const { Runner, Render, World, Engine } = window.Matter || {};
      if (runnerRef.current && Runner) Runner.stop(runnerRef.current);
      if (renderRef.current && Render) {
        Render.stop(renderRef.current);
        renderRef.current.canvas?.remove?.();
        renderRef.current.textures = {};
      }
      if (engineRef.current && World && Engine) {
        World.clear(engineRef.current.world);
        Engine.clear(engineRef.current);
      }
      runnerRef.current = null;
      renderRef.current = null;
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Position-sync loop — now properly cancelled on unmount / when the
  // body list changes. Previously this rAF loop had no cleanup at all
  // and ran forever, including after the component unmounted.
  useEffect(() => {
    if (!bubbleBodies.length) return;

    const updatePositions = () => {
      bubbleBodies.forEach((body, index) => {
        const overlay = overlayRef.current?.children[index];
        if (overlay) {
          const { x, y } = body.position;
          const angle = body.angle;
          overlay.style.left = `${x}px`;
          overlay.style.top = `${y}px`;
          overlay.style.transformOrigin = "center center";
          overlay.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }
      });
      rafIdRef.current = requestAnimationFrame(updatePositions);
    };

    rafIdRef.current = requestAnimationFrame(updatePositions);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [bubbleBodies]);

  useEffect(() => {
    if (canvasRef.current && overlayRef.current) {
      if (showModal) {
        canvasRef.current.style.pointerEvents = "none";
        overlayRef.current.style.pointerEvents = "none";
        if (renderRef.current?.mouse) {
          renderRef.current.mouse.element.style.pointerEvents = "none";
        }
      } else {
        canvasRef.current.style.pointerEvents = "auto";
        overlayRef.current.style.pointerEvents = "none";
        if (renderRef.current?.mouse) {
          renderRef.current.mouse.element.style.pointerEvents = "auto";
        }
      }
    }
  }, [showModal]);

  // Close modal on Escape — keyboard users previously had no way to
  // dismiss it other than clicking the backdrop or the X button.
  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  const handleTouchStart = (e) => {
    setTouchStartTime(Date.now());
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    setTouchStartPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleTouchEnd = (e) => {
    const touchEndTime = Date.now();
    const touch = e.changedTouches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const touchEndX = touch.clientX - rect.left;
    const touchEndY = touch.clientY - rect.top;
    const touchDuration = touchEndTime - touchStartTime;
    const touchDistance = Math.sqrt(
      (touchEndX - touchStartPosition.x) ** 2 +
        (touchEndY - touchStartPosition.y) ** 2,
    );
    if (touchDuration < 300 && touchDistance < 10) {
      handleCanvasClick({ clientX: touch.clientX, clientY: touch.clientY });
    }
  };

  const handleCanvasClick = (e) => {
    if (isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedBubble = bubbleBodies.find((body) => {
      const dx = body.position.x - x;
      const dy = body.position.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (body.bubbleData.type === "circle") {
        const radius = (body.bubbleData.baseRadius || 80) * scaleFactor;
        const hitRadius = radius * (window.innerWidth < 768 ? 1.5 : 1);
        return distance <= hitRadius;
      }
      const halfWidth = ((body.bubbleData.baseWidth || 200) * scaleFactor) / 2;
      const halfHeight =
        ((body.bubbleData.baseHeight || 120) * scaleFactor) / 2;
      const hitWidth = halfWidth * (window.innerWidth < 768 ? 1.5 : 1);
      const hitHeight = halfHeight * (window.innerWidth < 768 ? 1.5 : 1);
      return Math.abs(dx) <= hitWidth && Math.abs(dy) <= hitHeight;
    });

    if (clickedBubble) setShowModal(true);
  };

  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = () => setTimeout(() => setIsDragging(false), 100);

  const getFontSize = (bubble) => {
    let baseSize;
    if (bubble.type === "circle") {
      baseSize = screenWidth >= 768 ? 40 : 32;
    } else {
      baseSize = screenWidth >= 768 ? 40 : 32;
      if (screenWidth < 576) baseSize = 18;
    }
    return Math.max(14, baseSize * scaleFactor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      full_name: fullName,
      email,
      company,
      project_goals: projectGoals,
      services: selectedServices.join(", "),
      budget: budgetRange,
    };

    toast.loading("Sending your message...");

    emailjs
      .send(
        "service_4q2smkf",
        "template_dzdja82",
        templateParams,
        "kxl8b3nfodisnnP4k",
      )
      .then(() => {
        toast.dismiss();
        toast.success("✅ Your message was sent!");
        setShowModal(false);
        setFullName("");
        setEmail("");
        setCompany("");
        setProjectGoals("");
        setSelectedServices([]);
        setBudgetRange("");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("❌ Something went wrong. Try again.");
        console.error(err);
      });
  };

  return (
    <section id="contact" className="px-2 sm:px-5 py-5 bg-transparent  pt-10  ">
      <div
        ref={sceneRef}
        className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[630px] border-b  border-[var(var(--border-color)] overflow-hidden rounded-[10px] z-[1]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between sm:p-4 p-2  text-white">
          <h4 className=" text-sm md:text-xl sm:text-base text-[var(--color-text)] ">
            Aswan, Egypt
          </h4>
          <h4 className=" text-sm md:text-xl sm:text-base text-[var(--color-text)]">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
        </div>

        <div className="space-y-3  text-center pt-12 sm:pt-16 lg:pt-20 z-10 relative px-4 ">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm bg-[var(--color-live-projects)] text-[var(--color-bg)]">
            Contact
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Let's work together!
          </h2>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-5"
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: "pointer" }}
        />

        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full z-20"
          style={{ pointerEvents: "none" }}
        >
          {bubblesData.map((bubble) => {
            const width =
              bubble.type === "circle"
                ? bubble.baseRadius * 2 * scaleFactor
                : bubble.baseWidth * scaleFactor;
            const height =
              bubble.type === "circle"
                ? bubble.baseRadius * 2 * scaleFactor
                : bubble.baseHeight * scaleFactor;

            return (
              <div
                key={bubble.id}
                className="absolute"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  cursor: "pointer",
                  pointerEvents: "none",
                }}
              >
                <div className="flex flex-col items-center justify-center text-center w-full h-full">
                  <span
                    className="font-bold leading-tight text-[var(--color-white)]"
                    style={{
                      fontSize: `${getFontSize(bubble)}px`,
                      lineHeight: "1.1",
                      maxWidth: `${width * 0.8}px`,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: bubble.type === "circle" ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {bubble.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[9999] flex     items-center justify-between   p-2 sm:p-3 text-white text-xs sm:text-sm gap-2 ">
          <a
            href="https://wa.me/201223575572"
            target="_blank"
            rel="noreferrer"
            aria-label="Message on WhatsApp"
            className="sm:w-auto hover:text-[var(--color-primary-light)] text-[var(--color-primary)] font-bold sm:text-xl transition-colors"
          >
            <div className="relative w-8 h-8 group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:opacity-0">
                <Phone size={19} color="#139ecf" />
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                animate={prefersReducedMotion ? { y: 0 } : { y: [0, -6, 6, 0] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { repeat: Infinity, duration: 0.5 }
                }
              >
                <Phone size={19} color="#139ecf" />
              </motion.div>
            </div>
          </a>

          <div className="relative inline-block text-center group ">
            <div className="absolute left-1/2 -translate-x-1/2 md:top-[-220px] -top-36 md:w-[350px] ml-6 sm:ml-0 md:h-[200px] w-56 h-32 p-2 rounded-[10px] border-[1px] border-[#F0CCDF]/25 backdrop-blur-md opacity-0 translate-y-4 scale-95 pointer-events-none group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <HoverPreviewVideo
                src={Linkin}
                className="md:w-[99.9%] w-[99.9%] h-[99.9%] md:h-[99.9%] object-cover"
              />
            </div>
            <div
              className="absolute left-1/2 -translate-x-1/2 w-24 h-48 -top-60 opacity-0 pointer-events-none group-hover:pointer-events-auto z-40"
              aria-hidden="true"
            />
            <a
              className="hover:text-[var(--color-primary-light)] !cursor-pointer  text-[var(--color-primary)] font-bold sm:text-xl transition-colors"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mahmoud-fattah-a541b0262/"
              target="_blank"
              aria-label="Visit LinkedIn profile"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center  justify-center transition-all duration-300 ease-in-out group-hover:opacity-0">
                  <UseAnimations
                    animation={linkedin}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={false}
                    loop={false}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <UseAnimations
                    animation={linkedin}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={true}
                    loop={true}
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="relative inline-block text-center group ">
            <div className="absolute left-1/2 -translate-x-1/2 md:top-[-220px] -top-36 md:w-[360px]  md:h-[200px] w-56 h-32 p-2  rounded-[10px] sm:border-[1px] border-[.5px] border-[#F0CCDF]/25 backdrop-blur-md opacity-0 translate-y-4 scale-95 pointer-events-none group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <HoverPreviewVideo
                src={Linkin2}
                className="md:w-[99.9%] w-[99.9%] h-[99.9%] md:h-[99.9%] object-cover"
              />
            </div>
            <div
              className="absolute left-1/2 -translate-x-1/2 w-24 h-48 -top-60 opacity-0 pointer-events-none group-hover:pointer-events-auto z-40"
              aria-hidden="true"
            />
            <a
              href="https://github.com/Mahmoudfattah?tab=repositories"
              target="_blank"
              className="hover:text-[var(--color-primary-light)] text-[var(--color-primary)] font-bold sm:text-xl transition-colors"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:opacity-0">
                  <UseAnimations
                    animation={github}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={false}
                    loop={false}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <UseAnimations
                    animation={github}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={true}
                    loop={true}
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="relative inline-block text-center group  ">
            <div
              className="absolute left-1/2 
            -translate-x-[60%]
            sm:-translate-x-1/2
            md:top-[-220px] -top-36 md:w-[390px] sm:mr-0 
            md:h-[200px] w-56 h-32 p-2 rounded-[10px] border-[1px] 
            border-[#F0CCDF]/25 backdrop-blur-md opacity-0 translate-y-4 
            scale-95 pointer-events-none group-hover:scale-100 
            group-hover:translate-y-0 group-hover:opacity-100 
            group-hover:pointer-events-auto transition-all duration-300 z-50"
            >
              <HoverPreviewVideo
                src={Linkin3}
                className="md:w-[99.9%] w-[99.9%] h-[99.9%] md:h-[99.9%] object-cover"
              />
            </div>
            <div
              className="absolute left-1/2 -translate-x-1/2 w-24 h-48 -top-60 opacity-0 pointer-events-none group-hover:pointer-events-auto z-40"
              aria-hidden="true"
            />
            <a
              href="https://www.instagram.com/mo__fattah/"
              target="_blank"
              className="hover:text-[var(--color-primary-light)] text-[var(--color-primary)] font-bold sm:text-xl transition-colors"
              rel="noopener noreferrer"
              aria-label="Visit Instagram profile"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:opacity-0">
                  <UseAnimations
                    animation={instagram}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={false}
                    loop={false}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <UseAnimations
                    animation={instagram}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={true}
                    loop={false}
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="relative inline-block text-center group ">
            <a
              href="mailto:mahmoudfattahdeveloper@gmail.com"
              className="hover:text-[var(--color-primary-light)] text-[var(--color-primary)] font-bold sm:text-xl transition-colors"
              rel="noopener noreferrer"
              aria-label="Send an email"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:opacity-0">
                  <UseAnimations
                    animation={mail}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={false}
                    loop={false}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <UseAnimations
                    animation={mail}
                    size={24}
                    strokeColor="#139ecf"
                    autoplay={true}
                    loop={false}
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <section>
        {showModal && (
          <div
            className="fixed  
inset-0  
      bg-opacity-70 flex items-center justify-center z-[100] p-4 !overflow-y-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-[var(--bg)] !md:overflow-y-hidden hide-scrollbar rounded-[10px] w-[99%] h-[98%] px-3 py-3 relative max-w-full mx-auto shadow-lg"
              style={{ maxHeight: "99vh", overflowY: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close contact form"
                className="absolute top-4 right-4 text-[var(--color-bg)] rounded-full md:w-11 md:h-11 w-9 h-9 flex items-center justify-center bg-[var(--color-primary-dark)] transition-colors text-xl font-bold"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

              <h2
                id={modalTitleId}
                className="text-5xl sm:text-8xl font-bold text-[var(--color-primary)] mb-6"
              >
                Get in{" "}
                <span className="text-[var(--color-primary-dark)]">touch</span>
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all">
                    <label
                      htmlFor="contact-fullname"
                      className="text-[var(--color-primary)] font-bold text-2xl block mb-2"
                    >
                      Full name
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-md bg-[var(--color-bg-secondary)] placeholder:text-[var(--color-muted)] focus:outline-none placeholder:text-xl placeholder:font-bold"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all">
                    <label
                      htmlFor="contact-email"
                      className="text-[var(--color-primary)] font-bold text-2xl block mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md bg-[var(--color-bg-secondary)] placeholder:text-[var(--color-muted)] focus:outline-none placeholder:text-xl placeholder:font-bold"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all">
                    <label
                      htmlFor="contact-company"
                      className="text-[var(--color-primary)] font-bold text-2xl block mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-md bg-[var(--color-bg-secondary)] placeholder:text-[var(--color-muted)] focus:outline-none placeholder:text-xl placeholder:font-bold"
                      placeholder="Company name"
                    />
                  </div>

                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all md:col-span-2 lg:col-span-1">
                    <label
                      htmlFor="contact-goals"
                      className="text-[var(--color-primary)] font-bold text-2xl block mb-2"
                    >
                      Project goals
                    </label>
                    <textarea
                      id="contact-goals"
                      value={projectGoals}
                      onChange={(e) => setProjectGoals(e.target.value)}
                      rows={7}
                      className="w-full rounded-md bg-[var(--color-bg-secondary)] placeholder:text-[var(--color-muted)] focus:outline-none placeholder:text-xl placeholder:font-bold"
                      placeholder="Describe your goals"
                    />
                  </div>

                  {/* Service/budget "chips" were <span onClick> — not focusable,
                      no keyboard handler, so keyboard-only users could not
                      select a service or budget at all. Real <button>
                      elements fix that while keeping the same visual style. */}
                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-4 focus-within:ring-[var(--color-primary)] transition-all">
                    <p className="text-[var(--color-primary)] font-bold text-2xl mb-2">
                      What can I do for you?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => {
                        const active = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            aria-pressed={active}
                            className={`cursor-pointer rounded-full px-3 py-1 text-sm border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
                              ${
                                active
                                  ? "bg-[var(--color-primary)] text-white font-bold border-[2px] border-[var(--color-primary)]"
                                  : "bg-[var(--color-bg)] text-[var(--color-primary)] font-bold border-[2px] border-[var(--color-primary)]"
                              }`}
                            onClick={() =>
                              setSelectedServices((prev) =>
                                prev.includes(service)
                                  ? prev.filter((s) => s !== service)
                                  : [...prev, service],
                              )
                            }
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[var(--color-bg-secondary)] p-4 rounded-[15px] focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all">
                    <p className="text-[var(--color-primary)] font-bold text-2xl mb-2">
                      Do you have a budget range?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((item) => {
                        const active = budgetRange === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={active}
                            className={`cursor-pointer rounded-full px-3 py-1 text-sm border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                              active
                                ? "bg-[var(--color-primary)] text-white font-bold border-[2px] border-[var(--color-primary)]"
                                : "bg-[var(--color-bg)] text-[var(--color-primary)] font-bold border-[2px] border-[var(--color-primary)]"
                            }`}
                            onClick={() => setBudgetRange(active ? "" : item)}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="fixed sm:bottom-[25px] bottom-[30px] left-1/2 transform -translate-x-1/2 pb-2 z-[9999]">
                  <button
                    type="submit"
                    aria-label="Submit contact form"
                    className="bg-[var(--color-primary)] relative group text-white w-[120px] h-[50px] sm:w-[180px] sm:h-[60px] rounded-full flex items-center justify-between space-x-1 hover:bg-[var(--color-primary-light)] transition-colors shadow-lg overflow-hidden px-1 sm:px-2"
                  >
                    <span className="relative h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-full overflow-hidden bg-white flex items-center justify-center z-10">
                      <SendHorizontal className="absolute text-[var(--color-primary)] w-5 h-5 sm:w-7 sm:h-7 group-hover:-translate-x-[70px] transform transition-transform duration-300 ease-in-out" />
                      <SendHorizontal className="absolute text-[var(--color-primary-light)] w-5 h-5 sm:w-7 sm:h-7 translate-x-[70px] group-hover:translate-x-0 transform transition-transform duration-300 ease-in-out" />
                    </span>
                    <span className="sm:text-2xl text-white font-semibold !ml-7 sm:!ml-9 absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ease-in-out group-hover:-translate-y-full z-0">
                      Submit
                    </span>
                    <span className="sm:text-2xl text-white font-semibold !ml-7 sm:!ml-9 absolute inset-0 flex items-center justify-center transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 z-0">
                      Submit
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
