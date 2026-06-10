import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Profile() {
  // =========================================
  // USER DATA
  // =========================================

  const user = JSON.parse(localStorage.getItem("user"));

  const userName =
    user?.name ||
    (user?.email?.split("@")[0]?.charAt(0).toUpperCase() +
      user?.email?.split("@")[0]?.slice(1)) ||
    "Farmer";

  const userEmail = user?.email || "No Email";

  const joinedYear = new Date().getFullYear();

  // =========================================
  // STATS
  // =========================================

  const [stats, setStats] = useState({
    ai_queries: 0,
    disease_scans: 0,
    weather_checks: 0,
    farm_health: "92%",
  });

  // =========================================
  // FETCH STATS
  // =========================================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/stats?email=${userEmail}`
        );

        const data = await response.json();

        console.log(data);

        setStats({
          ai_queries: data.ai_queries || 0,
          disease_scans: data.disease_scans || 0,
          weather_checks: data.weather_checks || 0,
          farm_health: data.farm_health || "92%",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [userEmail]);

  // =========================================
  // UI
  // =========================================

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 min-h-screen">
        {/* HEADER */}

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
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            👨‍🌾 Farmer Profile
          </h1>

          <p className="text-gray-400 mb-10">
            Manage your AgroMind AI account 🌱
          </p>
        </motion.div>

        {/* PROFILE CARD */}

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
            mb-10
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              gap-6
            "
          >
            {/* AVATAR */}

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-green-500
                flex
                items-center
                justify-center
                text-5xl
                font-black
                text-black
                shadow-lg
                shadow-green-500/20
              "
            >
              {userName.charAt(0)}
            </div>

            {/* INFO */}

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black">
                {userName}
              </h2>

              <p className="text-lg text-gray-300">
                📧 Email:
                <span className="text-green-400 ml-2">
                  {userEmail}
                </span>
              </p>

              <p className="text-lg text-gray-300">
                📅 Joined:
                <span className="text-green-400 ml-2">
                  {joinedYear}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          {/* AI */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >
            <h3 className="text-xl font-bold mb-4">
              🤖 AI Queries
            </h3>

            <div className="text-5xl font-black text-green-400">
              {stats.ai_queries}
            </div>
          </motion.div>

          {/* DISEASE */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >
            <h3 className="text-xl font-bold mb-4">
              🦠 Disease Scans
            </h3>

            <div className="text-5xl font-black text-red-400">
              {stats.disease_scans}
            </div>
          </motion.div>

          {/* WEATHER */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >
            <h3 className="text-xl font-bold mb-4">
              🌦️ Weather Checks
            </h3>

            <div className="text-5xl font-black text-cyan-400">
              {stats.weather_checks}
            </div>
          </motion.div>

          {/* FARM HEALTH */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >
            <h3 className="text-xl font-bold mb-4">
              🌱 Farm Health
            </h3>

            <div className="text-5xl font-black text-yellow-400">
              {stats.farm_health}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;