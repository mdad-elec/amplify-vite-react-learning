import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        backgroundImage: 'url("/background.jpg")', // Replace with your image filename
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      }}
    >
      <h1>Select Assessment</h1>
      <button onClick={() => navigate("/class1")}>Assessment 1</button>
      <button onClick={() => navigate("/class2")}>Assessment 2</button>
      <button onClick={() => navigate("/class3")}>Assessment 3</button>
    </main>
  );
}

export default Home;
