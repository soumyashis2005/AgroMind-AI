import DashboardLayout from "../layouts/DashboardLayout";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

function Settings() {

  // ================= STATES =================

  const [darkMode, setDarkMode] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [language, setLanguage] =
    useState("English");

  // ================= LOAD SETTINGS =================

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    const savedNotifications =
      localStorage.getItem(
        "notifications"
      );

    const savedLanguage =
      localStorage.getItem(
        "language"
      );

    // ================= THEME =================

    if (savedTheme === "light") {

      setDarkMode(false);

      document.documentElement.classList.remove(
        "dark"
      );

    } else {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );

    }

    // ================= NOTIFICATIONS =================

    if (
      savedNotifications !== null
    ) {

      setNotifications(
        savedNotifications === "true"
      );

    }

    // ================= LANGUAGE =================

    if (savedLanguage) {

      setLanguage(savedLanguage);

    }

  }, []);

  // ================= TOGGLE THEME =================

  const handleThemeToggle = () => {

    if (darkMode) {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

      toast.success(
        "Light mode enabled ☀️"
      );

    } else {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

      toast.success(
        "Dark mode enabled 🌙"
      );

    }

    setDarkMode(!darkMode);

  };

  // ================= TOGGLE NOTIFICATIONS =================

  const handleNotifications = () => {

    const newValue =
      !notifications;

    setNotifications(newValue);

    localStorage.setItem(
      "notifications",
      newValue
    );

    toast.success(

      newValue
        ? "Notifications enabled 🔔"
        : "Notifications disabled 🔕"

    );

  };

  // ================= CHANGE LANGUAGE =================

  const handleLanguageChange = (
    e
  ) => {

    const selectedLanguage =
      e.target.value;

    setLanguage(
      selectedLanguage
    );

    localStorage.setItem(
      "language",
      selectedLanguage
    );

    toast.success(
      `${selectedLanguage} selected 🌍`
    );

  };

  return (

    <DashboardLayout>

      <div
        className="
          p-6
          md:p-10
          overflow-x-hidden
        "
      >

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              mb-3
            "
          >
            ⚙️ Settings
          </h1>

          <p className="text-gray-400 mb-10">

            Customize your AgroMind AI
            experience 🌱

          </p>

        </motion.div>

        {/* ================= SETTINGS GRID ================= */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          {/* ================= APPEARANCE ================= */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-black
                mb-4
              "
            >
              🌙 Appearance
            </h2>

            <p className="text-gray-400 mb-6">

              Switch between dark and
              light mode.

            </p>

            <button
              onClick={
                handleThemeToggle
              }
              className="
                bg-green-500
                hover:bg-green-400
                text-black
                px-6
                py-4
                rounded-2xl
                font-bold
                transition
                w-full
                md:w-auto
              "
            >

              {darkMode
                ? "Switch to Light Mode ☀️"
                : "Switch to Dark Mode 🌙"}

            </button>

          </motion.div>

          {/* ================= NOTIFICATIONS ================= */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-black
                mb-4
              "
            >
              🔔 Notifications
            </h2>

            <p className="text-gray-400 mb-6">

              Enable or disable
              farming alerts.

            </p>

            <button
              onClick={
                handleNotifications
              }
              className={`
                px-6
                py-4
                rounded-2xl
                font-bold
                transition
                w-full
                md:w-auto

                ${
                  notifications

                    ? `
                      bg-green-500
                      hover:bg-green-400
                      text-black
                    `

                    : `
                      bg-red-500
                      hover:bg-red-400
                      text-white
                    `
                }
              `}
            >

              {notifications
                ? "Notifications Enabled"
                : "Notifications Disabled"}

            </button>

          </motion.div>

          {/* ================= LANGUAGE ================= */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-black
                mb-4
              "
            >
              🌍 Language
            </h2>

            <p className="text-gray-400 mb-6">

              Select your preferred
              language.

            </p>

            <select
              value={language}
              onChange={
                handleLanguageChange
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
                w-full
              "
            >

              <option>
                English
              </option>

              <option>
                Bengali
              </option>

              <option>
                Hindi
              </option>

            </select>

          </motion.div>

          {/* ================= ACCOUNT ================= */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-black
                mb-4
              "
            >
              👤 Account
            </h2>

            <p className="text-gray-400 mb-6">

              Manage your AgroMind AI
              profile.

            </p>

            <div className="space-y-4">

              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-4
                "
              >
                👨‍🌾 Farmer Account Active
              </div>

              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-4
                "
              >
                📧 Email Connected
              </div>

              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-4
                "
              >
                🔒 Secure Login Enabled
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Settings;