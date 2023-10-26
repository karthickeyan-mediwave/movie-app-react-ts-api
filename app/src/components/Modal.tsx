import React from "react";
import { useNavigate } from "react-router-dom";

export interface modal {
  dialog: boolean;
}

const Modal: React.FC<modal> = ({ dialog }) => {
  const navigate = useNavigate();

  return (
    <dialog open={dialog}>
      <article>
        <p>Api request sucess</p>
        <footer>
          <button onClick={() => navigate("/")}>ok</button>
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
