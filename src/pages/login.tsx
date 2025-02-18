import { signIn, resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define types for the function parameters
type ResetPasswordInput = {
  username: string;
};

type ConfirmResetPasswordInput = {
  username: string;
  confirmationCode: string;
  newPassword: string;
};

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");  // For reset password
  const [code, setCode] = useState<string>("");  // For verification code
  const [resetMode, setResetMode] = useState<boolean>(false); // To switch between login and reset password form
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

  async function handleForgotPassword() {
    try {
      const input: ResetPasswordInput = { username: email };  // Creating the input object with the correct type
      await resetPassword(input);  // Call resetPassword with the input object
      alert("A verification code has been sent to your email.");
      setResetMode(true); // Switch to reset password mode
    } catch (error) {
      console.error("Error sending reset code:", error);
      alert("Error sending reset code.");
    }
  }

  const handleConfirmForgotPassword = async (username: string, code: string, newPassword: string) => {
    try {
      const input: ConfirmResetPasswordInput = { username, confirmationCode: code, newPassword };
      await confirmResetPassword(input);  // Use the correct input type
      alert("Password reset successful!");
      setResetMode(false); // Go back to login mode
    } catch (error) {
      console.error('Error confirming password reset:', error);
      alert('Error confirming password reset.');
    }
  };

  return (
    <div>
      <h2>{resetMode ? "Reset Password" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!resetMode && (
        <>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {resetMode && (
        <>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={() => handleConfirmForgotPassword(email, code, newPassword)}>
            Reset Password
          </button>
        </>
      )}
      <div>
        {!resetMode ? (
          <>
            <button onClick={handleForgotPassword}>Forgot Password?</button>
            <button onClick={() => navigate("/signupstudent")}>Sign Up</button>
          </>
        ) : (
          <button onClick={() => setResetMode(false)}>Back to Login</button>
        )}
      </div>
    </div>
  );
}

export default Login;
