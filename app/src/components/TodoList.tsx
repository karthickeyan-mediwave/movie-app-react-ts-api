import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Todo } from "../types";

const TodoList: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get<Todo[]>(`http://localhost:5476/movies`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }, []);
  const handledelete = () => {
    axios
      .delete<Todo[]>(`http://localhost:5476/movies/${id}`)
      .then((response) => {
        console.log("Todo updated:", response.data);
        window.location.href = "/";
        console.log(`${id}`);
        // setApiSuccess(true);
      })
      .catch((error) => {
        console.error("Error updating :", error);
      });
  };
  const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5476/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <main className="container">
        <h1>Movies</h1>
        <div className="grid">
          {todos.map((todo) => (
            <div>
              <article key={todo.id}>
                <h2>movie- {todo.title}</h2>
                <h3> Year: {todo.year}</h3>

                <div className="btn-wrap">
                  <button className="edit-btn">
                    <Link to={`/edit/${todo.id}`}>
                      <i className="fa fa-edit"> </i>
                    </Link>
                  </button>
                  <button className="delete-btn" onClick={handledelete}>
                    <i className="fa fa-trash-o"></i>
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </article>
            </div>
          ))}
        </div>
        <Link to="/add">Add movie</Link>
      </main>
    </div>
  );
};

export default TodoList;
