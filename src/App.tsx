import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import Login from "./pages/login";

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Select User Type</h1>
      <button onClick={() => navigate("/student")}>Student</button>
      <button onClick={() => navigate("/teacher")}>Teacher</button>
    </main>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/login" element={<Login/>} />

        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
