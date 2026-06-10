import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App.jsx";

createRoot(
  document.getElementById("root")
).render(

  <>

    {/* ================= GLOBAL TOAST ================= */}

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{

        duration: 3000,

        style: {
          background: "#111827",
          color: "#fff",
          border:
            "1px solid rgba(255,255,255,0.1)",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },

      }}
    />

    {/* ================= APP ================= */}

    <App />

  </>

);