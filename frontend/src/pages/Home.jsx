import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Autonomous AI Farming",
    desc: "Deep-learning guidance protocols for autonomous precision agriculture.",
    icon: "🌱",
    color: "from-green-400 to-cyan-400",
  },
  {
    title: "Predictive Atmospheric Intelligence",
    desc: "Hyper-local neural weather forecasting and pre-emptive climate alerts.",
    icon: "🌦",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Neural Pathogen Diagnostics",
    desc: "Instant spectral analysis and disease identification via satellite imaging.",
    icon: "📷",
    color: "from-red-400 to-pink-500",
  },
  {
    title: "Multilingual Voice Core",
    desc: "Natural language interface processing AgroMind's vast knowledge base.",
    icon: "🎤",
    color: "from-blue-400 to-purple-500",
  },
];

const containerPerspective = { perspective: 2000 };

export default function Home() {
  const containerRef = useRef(null);

  // Smooth scroll progress indicators
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#010103] text-white overflow-x-hidden relative selection:bg-green-500/30"
    >
      {/* 1. CINEMATIC BACKGROUND SYSTEM */}
      <motion.div
        style={{ translateY: backgroundY }}
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,78,59,0.1),transparent_70%)]" />
      </motion.div>

      {/* Background Star Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -150],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Cinematic Top Tracking Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 2. NAVIGATION BAR */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#010103]/60 border-b border-white/[0.03]"
      >
        <div className="max-w-screen-2xl mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 animate-pulse group-hover:scale-110 transition-transform" />
            <h1 className="text-xl font-black tracking-tighter text-white">
              Agro<span className="text-green-400">Mind AI</span>
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            {["Platform", "Intelligence", "Diagnostics", "Impact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="relative group py-1 transition-colors hover:text-white"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-green-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                whileTap={{ scale: 0.95 }}
                className="
      px-5
      py-2
      text-xs
      font-semibold
      uppercase
      tracking-wider
      rounded-full
      border
      border-white/[0.05]
      bg-white/[0.01]
      transition-all
    "
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  boxShadow: "0 10px 25px -5px rgba(34,197,94,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="
      px-5
      py-2
      text-xs
      font-semibold
      uppercase
      tracking-wider
      rounded-full
      bg-green-500
      text-black
      font-bold
      shadow-lg
      shadow-green-500/20
      transition-all
    "
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 3. HERO SECTION */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-6"
        style={containerPerspective}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { type: "spring" } },
            }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-green-500/20 bg-green-950/30 text-xs font-semibold uppercase tracking-widest text-green-300 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            OPERATIONAL PROTOCOL ACTIVATED
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 50 },
              },
            }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.95] text-white"
          >
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Precision Farming
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-300 bg-clip-text text-transparent animate-hue-rotate">
              Augmented by AI.
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.2 } },
            }}
            className="text-gray-400 text-lg md:text-xl mt-8 max-w-3xl font-light leading-relaxed"
          >
            AgroMind AI integrates intelligent crop analysis, disease
            diagnostics, weather forecasting, and smart farming automation into
            one unified agricultural platform.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 20px 35px -10px rgba(34,197,94,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="
      px-8
      py-4
      bg-green-500
      text-black
      rounded-xl
      font-extrabold
      text-base
      shadow-2xl
      transition-all
      duration-300
    "
              >
                Launch Dashboard
              </motion.button>
            </Link>
            <Link to="/chat">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="
      px-8
      py-4
      border
      border-white/[0.06]
      bg-white/[0.01]
      rounded-xl
      font-semibold
      text-base
      transition-all
      duration-300
    "
              >
                Explore Platform
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] uppercase tracking-widest font-bold">
            Scroll to initialize
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-gray-700 to-transparent"
          />
        </div>
      </section>

      {/* 4. DASHBOARD PREVIEW */}
      <section
        className="max-w-screen-2xl mx-auto px-8 py-24 relative z-10"
        style={containerPerspective}
      >
        <motion.div
          initial={{ rotateX: 12, opacity: 0, y: 60 }}
          whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ type: "spring", stiffness: 35, damping: 14 }}
          className="rounded-[2.5rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12 backdrop-blur-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Active Soil Biome",
                value: "94.8%",
                change: "+2.1%",
                icon: "🧬",
              },
              {
                label: "Predictive Model Accuracy",
                value: "99.1%",
                change: "+0.5%",
                icon: "📡",
              },
              {
                label: "Net Yield Projection",
                value: "+22.7%",
                change: "+4.3%",
                icon: "📈",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{
                  y: -6,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(34,197,94,0.15)",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.03] bg-black/40 p-8 cursor-pointer group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {stat.label}
                  </p>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {stat.value}
                </h2>
                <div className="flex items-center gap-1.5 mt-3 text-green-400 text-sm font-semibold">
                  <span>▲</span>
                  {stat.change}{" "}
                  <span className="text-gray-600 font-medium text-xs">
                    vs last cycle
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. FEATURES GRID WITH DYNAMIC INTERACTIVE TILT */}
      <section
        className="max-w-screen-2xl mx-auto px-8 py-28 relative z-10"
        style={containerPerspective}
      >
        <div className="mb-20">
          <span className="text-green-400 font-bold uppercase tracking-widest text-xs">
            System Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-3 max-w-4xl leading-tight">
            Built for next-generation environmental governance.
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const cardRef = useRef(null);
            const [tilt, setTilt] = useState({ x: 0, y: 0 });

            const handleMouse = (e) => {
              if (!cardRef.current) return;
              const box = cardRef.current.getBoundingClientRect();
              const x = (e.clientX - box.left) / box.width - 0.5;
              const y = (e.clientY - box.top) / box.height - 0.5;
              setTilt({ x: x * 12, y: y * -12 }); // Highly responsive cinematic 12-degree limit
            };

            return (
              <motion.div
                key={index}
                ref={cardRef}
                onMouseMove={handleMouse}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: "spring", stiffness: 150, damping: 22 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 50, damping: 15 },
                  },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative bg-white/[0.01] border border-white/[0.05] rounded-[2rem] p-10 transition-all hover:border-green-500/20 hover:bg-white/[0.03] cursor-pointer shadow-lg hover:shadow-green-500/[0.02]"
              >
                {/* 3D Popping Icon Block */}
                <div
                  style={{ transform: "translateZ(40px)" }}
                  className="mb-8 relative w-16 h-16 transition-transform duration-300 group-hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 blur-lg group-hover:opacity-40 transition-opacity`}
                  />
                  <div className="relative text-3xl w-16 h-16 rounded-2xl bg-black border border-white/[0.06] flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                {/* Text layers pushed forward on Z-Axis */}
                <h3
                  style={{ transform: "translateZ(25px)" }}
                  className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-green-300 transition-colors duration-300"
                >
                  {feature.title}
                </h3>
                <p
                  style={{ transform: "translateZ(15px)" }}
                  className="text-gray-400 leading-relaxed font-light text-sm md:text-base"
                >
                  {feature.desc}
                </p>

                {/* Micro Ambient Line Trigger */}
                <div
                  className={`absolute bottom-0 left-10 right-10 h-[2px] bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 6. AI INTERFACE CHAT EXECUTION BLOCK */}
      <section className="max-w-screen-2xl mx-auto px-8 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-green-400 font-bold uppercase tracking-widest text-xs">
              Neural Interface
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mt-3 leading-tight">
              AgroMind AI Smart Assistant.
            </h2>
            <p className="text-gray-400 mt-6 text-lg font-light leading-relaxed">
              Interact with AgroMind AI for real-time farming guidance, crop
              diagnostics, weather insights, and smart agricultural
              recommendations.
            </p>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-black rounded-[2rem] p-8 backdrop-blur-2xl shadow-2xl"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.8 } },
                }}
                className="space-y-6"
              >
                {/* User Message */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring" },
                    },
                  }}
                  whileHover={{ scale: 1.01, x: -2 }}
                  className="flex justify-end cursor-pointer"
                >
                  <div className="bg-green-500 text-black px-6 py-3.5 rounded-[1.5rem] rounded-br-none max-w-md font-semibold text-sm md:text-base shadow-lg shadow-green-500/10">
                    AgroMind AI, analyze rice crop disease symptoms.
                  </div>
                </motion.div>

                {/* Neural Calculation Intermediary Step */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex justify-start items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-bold text-black text-[10px] animate-pulse">
                    AM
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] text-gray-500 px-5 py-2.5 rounded-xl italic text-xs">
                    Accessing satellite spectral data... Analyzing markers...
                  </div>
                </motion.div>

                {/* Structural Automated AI Response Output */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring" },
                    },
                  }}
                  whileHover={{ scale: 1.01, x: 2 }}
                  className="flex justify-start items-start gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-bold text-black text-[10px] mt-1">
                    AM
                  </div>
                  <div className="bg-black/40 border border-white/[0.06] px-6 py-5 rounded-[1.5rem] rounded-bl-none max-w-xl transition-colors hover:border-white/10">
                    <p className="text-white text-base font-medium">
                      Analysis complete. Sector Gamma shows{" "}
                      <span className="text-red-400 font-bold">
                        Early Blight
                      </span>{" "}
                      signature (88% confidence).
                    </p>
                    <p className="text-gray-400 mt-3 text-sm font-light leading-relaxed">
                      Prescriptive Action: Deploy autonomous fungicide drone{" "}
                      <span className="text-green-400 font-mono">[Unit-7]</span>{" "}
                      to coordinates immediately. Isolate affected zone.
                    </p>
                  </div>
                </motion.div>

                {/* Simulation Terminal Bottom Row */}
                <div className="pt-4 flex gap-3 items-center border-t border-white/[0.04] text-gray-600">
                  <span className="text-green-500 font-mono text-sm">{`>`}</span>
                  <span className="flex-1 text-xs tracking-wide">
                    Awaiting further structural protocols...
                  </span>
                  <div className="w-1.5 h-4 bg-green-500 animate-blink" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Injection Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes hue-rotate {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }
        .animate-hue-rotate {
          animation: hue-rotate 25s linear infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `,
        }}
      />
    </div>
  );
}
