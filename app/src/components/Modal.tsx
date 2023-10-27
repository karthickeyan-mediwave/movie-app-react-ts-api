import React from "react";

interface ModalProps {
  dialog: boolean;
  setDialog?: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ dialog }) => {
  return (
    <dialog open={dialog}>
      <article>
        <p>API request success</p>
        <footer>
          <a href="/" role="button" className="secondary">
            ok
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
