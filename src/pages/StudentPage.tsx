import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from "react-router-dom";

const client = generateClient<Schema>();

function StudentPage() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
    // Fetching todos after successful login
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, [user, navigate]);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>Student Page</h1>
      {user ? (
        <>
          <p>Welcome, {user?.username}!</p>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default StudentPage;
