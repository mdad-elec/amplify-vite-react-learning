import { useState, FormEvent } from "react";
import { confirmSignUp } from "@aws-amplify/auth";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  email: string;
}

function ConfirmAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState((location.state as LocationState)?.email || "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!email || !code) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      alert("Account confirmed! You can now log in.");
      navigate("/login");
    } catch (error: unknown) {
      console.error("Confirmation error:", error);
      setError(
        error instanceof Error 
          ? error.message 
          : "Failed to confirm account."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="confirm-account">
      <h2>Confirm Your Account</h2>
      <form onSubmit={handleConfirm}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Confirming..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}

export default ConfirmAccount;
