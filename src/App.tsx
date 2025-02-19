import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Assessment1 from "./pages/Assessment1";
import Assessment2 from "./pages/Assessment2";
import Assessment3 from "./pages/Assessment3";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Select Class</h1>
      <button onClick={() => navigate("/class1")}>Class 1</button>
      <button onClick={() => navigate("/class2")}>Class 2</button>
      <button onClick={() => navigate("/class3")}>Class 3</button>
    </main>
  );
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
            path="/"
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
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
