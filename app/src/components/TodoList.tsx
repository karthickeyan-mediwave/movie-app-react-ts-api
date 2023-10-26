import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { getMovies } from "./Learning";

import { Todo } from "../types";

const TodoList: React.FC = () => {
  // const { id } = useParams<{ id: string }>();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [dialog, setdialog] = useState(false);

  useEffect(() => {
    async function getMoviesFromAPI() {
      try {
        const response = await getMovies();
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    getMoviesFromAPI();
  }, []);

  const handledelete = (id: number) => {
    axios
      .delete<Todo[]>(`http://localhost:5476/movies/${id}`)
      .then((response) => {
        console.log("Todo deleted:", response.data);
        console.log(`${id}`);
        setdialog(true);
      })
      .catch((error) => {
        console.error("Error updating :", error);
      });
  };

  return (
    <div>
      <main className="container">
        <h1>Movies</h1>
        <a href="/add" role="button">
          <i className="fa fa-plus  kkk"> </i>
        </a>
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
                  <button
                    className="delete-btn"
                    onClick={() => handledelete(todo.id)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        <dialog open={dialog}>
          <article>
            <p>Api request sucess</p>
            <footer>
              <a href="/" role="button">
                ok
              </a>
            </footer>
          </article>
        </dialog>
      </main>
    </div>
  );
};

export default TodoList;
