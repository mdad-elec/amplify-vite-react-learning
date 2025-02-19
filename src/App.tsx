import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/HomePage";
import Assessment1 from "./pages/Assessment1";
import Assessment2 from "./pages/Assessment2";
import Assessment3 from "./pages/Assessment3";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);

  // Wait for authentication status to avoid incorrect redirections
  if (authStatus === "configuring") {
    return <div>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class1"
            element={
              <ProtectedRoute>
                <Assessment1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class2"
            element={
              <ProtectedRoute>
                <Assessment2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class3"
            element={
              <ProtectedRoute>
                <Assessment3 />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to /app */}
          <Route path="/" element={<Navigate to="/app" replace />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
