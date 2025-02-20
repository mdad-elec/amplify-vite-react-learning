import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, fetchAuthSession } from "@aws-amplify/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signIn({ username: email, password });
      const session = await fetchAuthSession();
      if (session) {
        navigate("/app", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    }
  }

  return (
    <div className="login-container">
      {/* Image from the public directory */}
      <img src="/logo.jpg" alt="App Logo" className="login-logo" />

      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}

export default Login;
