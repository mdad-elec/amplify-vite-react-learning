import { signIn } from "@aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signIn({ username: email, password });
      alert("Login successful!");
      navigate("/student"); // Redirect after login
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
