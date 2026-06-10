import {
  Navigate,
} from "react-router-dom";

function ProtectedRoute({
  children,
}) {

  // =========================
  // CHECK USER
  // =========================

  const user = localStorage.getItem(
    "user"
  );

  // =========================
  // REDIRECT IF NOT LOGGED IN
  // =========================

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  // =========================
  // SHOW PAGE
  // =========================

  return children;

}

export default ProtectedRoute;