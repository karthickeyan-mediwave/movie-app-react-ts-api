import React, { useState } from "react";
import axios from "axios";

// interface Todo {
//   title: string;
//   year: number;
// }
import { Todo1 } from "../types";

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<Todo1>({ title: "", year: 0 });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, year: Number(e.target.value) });
  };

  const handleSave = () => {
    axios
      .post(`http://localhost:5476/movies`, todo)
      .then((response) => {
        console.log("Todo created:", response.data);
        window.location.href = "/";
        alert("sucesssfully add movie");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  return (
    <div>
      <main className="container">
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
      </main>
    </div>
  );
};

export default AddTodo;
