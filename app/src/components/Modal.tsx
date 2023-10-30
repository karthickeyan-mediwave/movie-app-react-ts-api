import React from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  dialog: boolean;
  setDialog: (value: boolean) => void;
  open?: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ dialog, setDialog }) => {
  const navigate = useNavigate();
  function handlecancel() {
    // close = { dialog };
    // navigate("/");
    // close(false);
    setDialog(false);
    navigate("/");
  }
  return (
    <div>
      <dialog open={dialog}>
        <article>
          <p>API request success</p>
          <footer>
            <button onClick={() => navigate("/")}>ok</button>
            <button onClick={handlecancel}>cancel </button>
          </footer>
        </article>
      </dialog>
      <dialog>
        <article>
          <p>API request success</p>
          <footer>
            <button onClick={() => navigate("/")}>ok</button>
            <button onClick={handlecancel}>cancel </button>
          </footer>
        </article>
      </dialog>
    </div>
  );
};

export default Modal;
