import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();
      setTodos(data.todos);
    }
    fetchTodos();
  }, []);

  const fetchInput = (e) => {
    setInput(e.target.value);
  };

  const addNewTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      todo: input,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleClick = (itemId) => {
    setEditingId(itemId);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" onChange={fetchInput} />
      <button onClick={addNewTodo}>Add</button>
      <ul>
        {todos.map((item) =>
          editingId === item.id ? (
            <input type="text" value={item.todo} autofocus />
          ) : (
            <li key={item.id} onClick={() => handleClick(item.id)}>
              {item.todo}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
