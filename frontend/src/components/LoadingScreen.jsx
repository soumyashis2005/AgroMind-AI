import { motion } from "framer-motion";

function LoadingScreen() {

  return (

    <div
      className="
        fixed
        inset-0
        bg-[#050816]
        flex
        flex-col
        items-center
        justify-center
        z-[999]
      "
    >

      {/* ================= LOGO ================= */}

      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          text-5xl
          md:text-7xl
          font-black
          text-green-400
          mb-6
        "
      >
        🌱 AgroMind AI
      </motion.h1>

      {/* ================= SUBTEXT ================= */}

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
          duration: 0.8,
        }}
        className="
          text-gray-400
          text-lg
          md:text-xl
          text-center
          px-6
        "
      >

        Smart Agriculture Powered by AI

      </motion.p>

      {/* ================= LOADING DOTS ================= */}

      <div
        className="
          flex
          gap-3
          mt-10
        "
      >

        <div
          className="
            w-4
            h-4
            rounded-full
            bg-green-400
            animate-bounce
          "
        />

        <div
          className="
            w-4
            h-4
            rounded-full
            bg-green-400
            animate-bounce
            [animation-delay:0.2s]
          "
        />

        <div
          className="
            w-4
            h-4
            rounded-full
            bg-green-400
            animate-bounce
            [animation-delay:0.4s]
          "
        />

      </div>

    </div>

  );

}

export default LoadingScreen;