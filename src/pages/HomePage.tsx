import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Select Assessment</h1>
      <button onClick={() => navigate("/class1")}>Assessment 1</button>
      <button onClick={() => navigate("/class2")}>Assessment 2</button>
      <button onClick={() => navigate("/class3")}>Assessment 3</button>
    </main>
  );
}

export default Home;
