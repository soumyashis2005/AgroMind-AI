import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Register() {

  // =========================
  // STATES
  // =========================

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // =========================
  // REGISTER FUNCTION
  // =========================

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                username,
                email,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (response.ok) {

          toast.success(
            "Registration Successful 🚀"
          );

          navigate("/login");

        } else {

          toast.error(
            data.error ||
            "Registration failed"
          );

        }

      } catch (error) {

        console.error(error);

        toast.error(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        p-6
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          w-full
          max-w-md
          bg-white/[0.03]
          border
          border-white/10
          rounded-3xl
          p-8
          text-white
          shadow-2xl
        "
      >

        {/* ================= HEADER ================= */}

        <div className="text-center mb-8">

          <h1
            className="
              text-4xl
              font-black
              mb-3
            "
          >
            🌱 Register
          </h1>

          <p className="text-gray-400">
            Create your AgroMind AI account
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* ================= USERNAME ================= */}

          <div>

            <label
              className="
                block
                mb-2
                text-gray-300
              "
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Enter username"
              required
              className="
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-green-400
                transition
              "
            />

          </div>

          {/* ================= EMAIL ================= */}

          <div>

            <label
              className="
                block
                mb-2
                text-gray-300
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter email"
              required
              className="
                w-full
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-green-400
                transition
              "
            />

          </div>

          {/* ================= PASSWORD ================= */}

          <div>

            <label
              className="
                block
                mb-2
                text-gray-300
              "
            >
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
                required
                className="
                  w-full
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-green-400
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              >

                {showPassword
                  ? <FiEyeOff />
                  : <FiEye />}

              </button>

            </div>

          </div>

          {/* ================= REGISTER BUTTON ================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-500
              hover:bg-green-400
              disabled:opacity-50
              text-black
              py-4
              rounded-2xl
              font-bold
              transition
              text-lg
            "
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

        </form>

        {/* ================= LOGIN ================= */}

        <p
          className="
            text-center
            text-gray-400
            mt-6
          "
        >

          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-green-400
              hover:underline
            "
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Register;