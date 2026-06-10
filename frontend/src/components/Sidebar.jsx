import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiHome,
  FiMessageSquare,
  FiCloudRain,
  FiActivity,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import toast from "react-hot-toast";

function Sidebar() {

  // =========================================
  // NAVIGATION
  // =========================================

  const navigate = useNavigate();

  // =========================================
  // USER
  // =========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");

  };

  // =========================================
  // NAVIGATION LINKS
  // =========================================

  const links = [

    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
    },

    {
      path: "/chat",
      label: "AI Chat",
      icon: <FiMessageSquare />,
    },

    {
      path: "/weather",
      label: "Weather",
      icon: <FiCloudRain />,
    },

    {
      path: "/disease-detection",
      label: "Disease Detection",
      icon: <FiActivity />,
    },

    {
      path: "/profile",
      label: "Profile",
      icon: <FiUser />,
    },

    {
      path: "/settings",
      label: "Settings",
      icon: <FiSettings />,
    },

  ];

  // =========================================
  // UI
  // =========================================

  return (

    <div
      className="
        w-[280px]
        h-screen
        bg-[#081120]
        border-r
        border-white/10
        flex
        flex-col
        overflow-hidden
      "
    >

      {/* =========================================
          LOGO
      ========================================= */}

      <div
        className="
          px-6
          py-7
          border-b
          border-white/10
          shrink-0
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-green-400
            leading-none
          "
        >

          AgroMind AI

        </h1>

        <p
          className="
            text-gray-400
            mt-3
            text-sm
          "
        >

          Smart Agriculture Platform 🌱

        </p>

      </div>

      {/* =========================================
          USER CARD
      ========================================= */}

      <div
        className="
          p-5
          shrink-0
        "
      >

        <div
          className="
            bg-white/[0.04]
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >

          {/* AVATAR */}

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-green-500
              flex
              items-center
              justify-center
              text-black
              text-2xl
              font-black
              mb-4
            "
          >

            {user?.username
              ?.charAt(0)
              ?.toUpperCase() || "U"}

          </div>

          {/* USERNAME */}

          <h2
            className="
              text-2xl
              font-bold
              leading-tight
            "
          >

            {user?.username}

          </h2>

          {/* EMAIL */}

          <p
            className="
              text-gray-400
              text-sm
              break-all
              mt-2
              leading-relaxed
            "
          >

            {user?.email}

          </p>

        </div>

      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          pb-6
          space-y-3
        "
      >

        {links.map(
          (link, index) => (

            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-300
                text-lg

                ${
                  isActive
                    ? `
                      bg-green-500
                      text-black
                      font-bold
                    `
                    : `
                      bg-white/[0.03]
                      hover:bg-white/[0.06]
                      border
                      border-white/5
                    `
                }
              `}
            >

              <span className="text-2xl">

                {link.icon}

              </span>

              {link.label}

            </NavLink>

          )
        )}

      </div>

      {/* =========================================
          LOGOUT
      ========================================= */}

      <div
        className="
          p-5
          border-t
          border-white/10
          shrink-0
        "
      >

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-400
            py-4
            rounded-2xl
            font-bold
            text-lg
            transition
          "
        >

          <FiLogOut className="text-2xl" />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;