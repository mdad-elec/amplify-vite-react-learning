import { useState } from "react";
import { signUp } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSignUp() {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });

      alert("Sign-up successful! Check your email to verify.");
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Sign-up failed. Check console for details.");
    }
  }

  return (
    <div>
      <h2>Student Sign Up</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
