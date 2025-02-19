import { signIn } from "@aws-amplify/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  async function handleLogin() {
    try {
      await signIn({ username: email, password });
      alert("Login successful!");
      navigate("/app", { replace: true }); // Ensure navigation happens
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}

export default Login;
