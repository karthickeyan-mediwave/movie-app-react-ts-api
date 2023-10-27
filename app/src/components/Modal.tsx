import React from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "./MovieList";

interface ModalProps {
  dialog: boolean;
  setDialog: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ dialog, setDialog }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setDialog(false);
    window.location.href = "/";
  };

  return (
    <dialog open={dialog}>
      <article>
        <p>API request success</p>
        <footer>
          {<MovieList /> ? (
            <>
              {" "}
              <button onClick={handleCancel}>ok</button>.
            </>
          ) : (
            <>
              <button onClick={() => navigate("/")}>OK</button>
            </>
          )}
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
