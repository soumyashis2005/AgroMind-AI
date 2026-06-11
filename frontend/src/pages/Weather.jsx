import DashboardLayout from "../layouts/DashboardLayout";

import {
  useState,
  useEffect,
  useCallback,
} from "react";

import { motion } from "framer-motion";

function Weather() {

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

  const [weather, setWeather] =
    useState(null);

  const [city, setCity] =
    useState("Kolkata");

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // FETCH WEATHER
  // =========================================

  const fetchWeather =
    useCallback(async () => {

      setLoading(true);

      try {

        const response =
          await fetch(

            `https://agromind-ai-q13r.onrender.com/weather?city=${city}&email=${userEmail}`

          );

        const data =
          await response.json();

        if (data.error) {

          alert(data.error);

          return;

        }

        setWeather(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }, [city, userEmail]);

  // =========================================
  // INITIAL WEATHER PREVIEW
  // =========================================

  useEffect(() => {

    const loadInitialWeather =
      async () => {

        try {

          const response =
            await fetch(

              `https://agromind-ai-q13r.onrender.com/weather-preview?city=${city}`

            );

          const data =
            await response.json();

          setWeather(data);

        } catch (error) {

          console.error(error);

        }

      };

    loadInitialWeather();

  }, []);

  // =========================================
  // UI
  // =========================================

  return (

    <DashboardLayout>

      <div
        className="
          p-6
          md:p-10
          overflow-x-hidden
          min-h-screen
        "
      >

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

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              mb-3
            "
          >

            🌦️ Weather Dashboard

          </h1>

          <p className="text-gray-400 mb-10">

            Real-time weather updates
            for smarter farming 🌱

          </p>

        </motion.div>

        {/* SEARCH */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
            mb-10
          "
        >

          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                fetchWeather();

              }

            }}
            placeholder="Enter city"
            className="
              flex-1
              bg-white/[0.03]
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
            onClick={fetchWeather}
            className="
              bg-green-500
              hover:bg-green-400
              hover:scale-105
              transition-all
              duration-300
              text-black
              px-8
              py-4
              rounded-2xl
              font-bold
              shrink-0
            "
          >

            Search

          </button>

        </div>

        {/* LOADING */}

        {loading && (

          <div
            className="
              flex
              items-center
              justify-center
              mt-20
            "
          >

            <div
              className="
                bg-white/[0.04]
                border
                border-white/10
                rounded-3xl
                px-8
                py-6
                flex
                items-center
                gap-3
              "
            >

              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                  animate-bounce
                "
              />

              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                  animate-bounce
                "
                style={{
                  animationDelay: "0.2s",
                }}
              />

              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                  animate-bounce
                "
                style={{
                  animationDelay: "0.4s",
                }}
              />

            </div>

          </div>

        )}

        {/* WEATHER */}

        {!loading && weather && (

          <>

            {/* CITY HEADER */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                bg-white/[0.03]
                border
                border-white/10
                rounded-3xl
                p-8
                mb-8
              "
            >

              <h2
                className="
                  text-4xl
                  font-black
                  mb-2
                "
              >

                📍 {weather.city}

              </h2>

              <p
                className="
                  text-gray-400
                  text-lg
                  capitalize
                "
              >

                {weather.description}

              </p>

            </motion.div>

            {/* WEATHER GRID */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                2xl:grid-cols-4
                gap-6
              "
            >

              {/* TEMP */}

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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >

                  🌡️ Temperature

                </h2>

                <div
                  className="
                    text-5xl
                    font-black
                    text-green-400
                  "
                >

                  {weather.temperature}°C

                </div>

              </motion.div>

              {/* HUMIDITY */}

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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >

                  💧 Humidity

                </h2>

                <div
                  className="
                    text-5xl
                    font-black
                    text-blue-400
                  "
                >

                  {weather.humidity}%

                </div>

              </motion.div>

              {/* WIND */}

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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >

                  🌬️ Wind Speed

                </h2>

                <div
                  className="
                    text-5xl
                    font-black
                    text-cyan-400
                  "
                >

                  {weather.wind_speed}

                </div>

                <p className="text-gray-400 mt-2">

                  m/s

                </p>

              </motion.div>

              {/* CONDITION */}

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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >

                  ☁️ Condition

                </h2>

                <div
                  className="
                    text-3xl
                    font-black
                    text-yellow-400
                    capitalize
                  "
                >

                  {weather.description}

                </div>

              </motion.div>

            </div>

          </>

        )}

      </div>

    </DashboardLayout>

  );

}

export default Weather;