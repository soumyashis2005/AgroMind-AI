import DashboardLayout from "../layouts/DashboardLayout";

import {
  FiMessageSquare,
  FiActivity,
  FiCloudRain,
  FiTrendingUp,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

function Dashboard() {

  // =========================================
  // USER
  // =========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userEmail =
    user?.email;

  // =========================================
  // STATES
  // =========================================

  const [stats, setStats] =
    useState({

      ai_queries: 0,

      disease_scans: 0,

      weather_checks: 0,

      farm_health: "92%",

    });

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH STATS
  // =========================================

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const response =
            await fetch(

              `https://agromind-ai-q13r.onrender.com/stats?email=${userEmail}`

            );

          const data =
            await response.json();

          console.log(
            "Dashboard Stats:",
            data
          );

          setStats({

            ai_queries:
              data.ai_queries || 0,

            disease_scans:
              data.disease_scans || 0,

            weather_checks:
              data.weather_checks || 0,

            farm_health:
              data.farm_health || "92%",

          });

        } catch (error) {

          console.error(
            "Dashboard Error:",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    if (userEmail) {

      fetchStats();

    }

  }, [userEmail]);

  // =========================================
  // CARDS
  // =========================================

  const cards = [

    {
      title: "AI Queries",
      value: stats.ai_queries,
      icon: <FiMessageSquare />,
      gradient:
        "from-green-500 to-emerald-600",
    },

    {
      title: "Disease Scans",
      value: stats.disease_scans,
      icon: <FiActivity />,
      gradient:
        "from-red-500 to-orange-500",
    },

    {
      title: "Weather Checks",
      value: stats.weather_checks,
      icon: <FiCloudRain />,
      gradient:
        "from-blue-500 to-cyan-500",
    },

    {
      title: "Farm Health",
      value: stats.farm_health,
      icon: <FiTrendingUp />,
      gradient:
        "from-purple-500 to-pink-500",
    },

  ];

  // =========================================
  // UI
  // =========================================

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          md:px-8
          py-8
        "
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-10">

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              mb-3
            "
          >

            🌱 Dashboard

          </h1>

          <p
            className="
              text-gray-400
              text-lg
            "
          >

            Monitor your smart farming
            analytics and AI insights.

          </p>

        </div>

        {/* =====================================
            STATS GRID
        ===================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-10
          "
        >

          {cards.map(
            (card, index) => (

              <div
                key={index}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  hover:scale-[1.03]
                  transition-all
                  duration-300
                "
              >

                {/* GLOW */}

                <div
                  className={`
                    absolute
                    top-0
                    right-0
                    w-32
                    h-32
                    blur-3xl
                    opacity-20
                    bg-gradient-to-br
                    ${card.gradient}
                  `}
                />

                {/* CONTENT */}

                <div className="relative z-10">

                  {/* ICON */}

                  <div
                    className={`
                      w-16
                      h-16
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-3xl
                      mb-5
                      bg-gradient-to-br
                      ${card.gradient}
                    `}
                  >

                    {card.icon}

                  </div>

                  {/* TITLE */}

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mb-2
                    "
                  >

                    {card.title}

                  </p>

                  {/* VALUE */}

                  <h2
                    className="
                      text-4xl
                      font-black
                    "
                  >

                    {loading
                      ? "..."
                      : card.value}

                  </h2>

                </div>

              </div>

            )
          )}

        </div>

        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >

          {/* LEFT SECTION */}

          <div
            className="
              xl:col-span-2
              space-y-6
            "
          >

            {/* AI INSIGHTS */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
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

                🤖 AI Farming Insights

              </h2>

              <p
                className="
                  text-gray-400
                  leading-relaxed
                  text-lg
                "
              >

                AgroMind AI helps farmers
                detect crop diseases,
                monitor weather conditions,
                analyze agricultural data,
                and improve productivity
                using AI-powered smart
                farming assistance.

              </p>

            </div>

            {/* RECENT ACTIVITY */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  mb-6
                "
              >

                📈 Recent Activity

              </h2>

              <div className="space-y-5">

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  🌾 AI analyzed crop health
                  and disease patterns.

                </div>

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  ☁️ Weather conditions checked
                  for smart irrigation planning.

                </div>

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  🤖 AgroMind chatbot assisted
                  with farming recommendations.

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="space-y-6">

            {/* FARM STATUS */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  mb-6
                "
              >

                🌱 Farm Status

              </h2>

              <div className="space-y-5">

                {/* CROP HEALTH */}

                <div>

                  <div
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >

                    <span>

                      Crop Health

                    </span>

                    <span>

                      {stats.farm_health}

                    </span>

                  </div>

                  <div
                    className="
                      w-full
                      h-3
                      bg-white/10
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className="
                        h-full
                        bg-green-500
                        rounded-full
                      "
                      style={{
                        width:
                          stats.farm_health,
                      }}
                    />

                  </div>

                </div>

                {/* AI EFFICIENCY */}

                <div>

                  <div
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >

                    <span>

                      AI Efficiency

                    </span>

                    <span>

                      96%

                    </span>

                  </div>

                  <div
                    className="
                      w-full
                      h-3
                      bg-white/10
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className="
                        h-full
                        bg-blue-500
                        rounded-full
                        w-[96%]
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* FARMING TIPS */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  mb-6
                "
              >

                💡 Farming Tips

              </h2>

              <div className="space-y-4">

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                  "
                >

                  🌾 Monitor crop leaves
                  regularly for diseases.

                </div>

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                  "
                >

                  💧 Maintain proper irrigation
                  schedules for better yield.

                </div>

                <div
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                  "
                >

                  ☀️ Check weather before
                  pesticide application.

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;