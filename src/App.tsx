import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
