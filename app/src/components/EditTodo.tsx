import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import Modal from "./Modal";

import { Todo } from "../types";
import Layout from "./Layout";

const EditTodo: React.FC = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo>({ id: 0, title: "", year: 0 });

  useEffect(() => {
    axios
      .get<Todo>(`http://localhost:5476/movies/${id}`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, year: Number(e.target.value) });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5476/movies/${id}`, todo)
      .then((response) => {
        console.log("Todo updated:", response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error updating :", error);
      });
  };

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);
  return (
    <Layout title="edit/${id}">
      <h2 className="edit-title">Edit movie</h2>
      <div className="edit-form">
        <input type="text" value={todo.title} onChange={handleTitleChange} />
        <input type="number" value={todo.year} onChange={handleYearChange} />
        <button onClick={handleSave}>Update</button>
      </div>
    </Layout>
  );
};

export default EditTodo;
