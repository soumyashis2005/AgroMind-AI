import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

function DashboardLayout({
  children,
}) {

  // =========================================
  // MOBILE SIDEBAR
  // =========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        text-white
        flex
      "
    >

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/60
            z-40
            lg:hidden
          "
        />

      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <div
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-50
          h-screen
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =========================================
            MOBILE CLOSE BUTTON
        ========================================= */}

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            lg:hidden
            absolute
            top-5
            right-5
            text-3xl
            z-50
          "
        >

          <FiX />

        </button>

        <Sidebar />

      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div
        className="
          flex-1
          min-w-0
          flex
          flex-col
        "
      >

        {/* =========================================
            MOBILE HEADER
        ========================================= */}

        <div
          className="
            lg:hidden
            sticky
            top-0
            z-30
            border-b
            border-white/10
            bg-[#050816]
            px-5
            py-4
            flex
            items-center
            justify-between
          "
        >

          <h1
            className="
              text-2xl
              font-black
              text-green-400
            "
          >

            🌱 AgroMind AI

          </h1>

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              text-3xl
            "
          >

            <FiMenu />

          </button>

        </div>

        {/* =========================================
            PAGE CONTENT
        ========================================= */}

        <main
          className="
            flex-1
          "
        >

          {children}

        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;