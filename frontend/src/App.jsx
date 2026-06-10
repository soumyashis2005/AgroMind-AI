import {
  useEffect,
  useState,
} from "react";

// =========================
// COMPONENTS
// =========================

import ProtectedRoute from "./components/ProtectedRoute";

import LoadingScreen from "./components/LoadingScreen";

// =========================
// ROUTER
// =========================

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =========================
// PAGES
// =========================

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Chat from "./pages/Chat";

import DiseaseDetection from "./pages/DiseaseDetection";

import Weather from "./pages/Weather";

import Profile from "./pages/Profile";

import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

function App() {

  // =========================
  // LOADING STATE
  // =========================

  const [loading, setLoading] =
    useState(true);

  // =========================
  // INITIAL LOADING
  // =========================

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 2500);

    return () =>
      clearTimeout(timer);

  }, []);

  // =========================
  // SHOW LOADING SCREEN
  // =========================

  if (loading) {

    return <LoadingScreen />;

  }

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>

              <Chat />

            </ProtectedRoute>
          }
        />

        <Route
          path="/disease-detection"
          element={
            <ProtectedRoute>

              <DiseaseDetection />

            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute>

              <Weather />

            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;