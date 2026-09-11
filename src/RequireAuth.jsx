import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();

  const isSignedIn = localStorage.getItem("isSignedIn") === "true";

  if (!isSignedIn) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;