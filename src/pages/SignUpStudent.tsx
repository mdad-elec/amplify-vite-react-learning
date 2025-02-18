import { useState } from "react";
import { signUp } from "@aws-amplify/auth"; // ✅ Correct import for Gen 2

function SignUpStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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

export default SignUpStudent;
