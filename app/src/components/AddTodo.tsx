import React, { useState } from "react";
import axios from "axios";

// interface Todo {
//   title: string;
//   year: number;
// }
import { Todo1 } from "../types";
import { useNavigate } from "react-router-dom";

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<Todo1>({ title: "", year: 0 });
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, year: Number(e.target.value) });
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5476/movies`, todo)
      .then((response) => {
        console.log("Todo created:", response.data);
        setLoading(false);
        navigate("/");

        // window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };
  const navigate = useNavigate();

  return (
    <div>
      <main className="container">
        {loading ? (
          <>Loading..</>
        ) : (
          <>
            <h2 className="add-title">Add movie</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="Title"
                value={todo.title}
                onChange={handleTitleChange}
              />
              <input
                type="number"
                placeholder="Year"
                value={todo.year}
                onChange={handleYearChange}
              />
              <button onClick={handleSave}>Add movie</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AddTodo;
