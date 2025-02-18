import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      // Creating the input object according to the expected SignInInput structure
      const input = { username: email, password };
      const user = await signIn(input); // Sign in with the input object
      console.log("Login successful:", user);
      alert("Login successful!");
      // Redirect to student page after successful login
      navigate("/student");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed.");
    }
  }

  return (
    <div>
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
      <div>
        <button onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
