import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function NotFound() {

  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        px-6
        text-white
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          text-center
          max-w-2xl
        "
      >

        {/* ================= 404 ================= */}

        <h1
          className="
            text-7xl
            md:text-9xl
            font-black
            text-green-400
            mb-6
          "
        >
          404
        </h1>

        {/* ================= TITLE ================= */}

        <h2
          className="
            text-3xl
            md:text-5xl
            font-black
            mb-6
          "
        >
          Oops! Page Not Found 🌱
        </h2>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            text-gray-400
            text-lg
            mb-10
            leading-relaxed
          "
        >

          The page you are looking for
          does not exist or may have been moved.

        </p>

        {/* ================= BUTTONS ================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
          "
        >

          {/* ================= HOME ================= */}

          <Link
            to="/"
            className="
              bg-green-500
              hover:bg-green-400
              text-black
              px-8
              py-4
              rounded-2xl
              font-bold
              transition
            "
          >
            🏠 Go Home
          </Link>

          {/* ================= DASHBOARD ================= */}

          <Link
            to="/dashboard"
            className="
              border
              border-white/10
              bg-white/[0.03]
              hover:bg-white/[0.06]
              px-8
              py-4
              rounded-2xl
              font-bold
              transition
            "
          >
            📊 Dashboard
          </Link>

        </div>

      </motion.div>

    </div>

  );

}

export default NotFound;