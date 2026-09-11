import { useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = () => {
    localStorage.setItem("isSignedIn", "true");
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Sign In</h2>

      <p>Please sign in to continue to checkout.</p>

      <button onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}

export default SignIn;