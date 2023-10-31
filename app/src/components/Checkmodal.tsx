import { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal1(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <dialog open>
          <article>{props.children}</article>
        </dialog>
      )}
    </>
  );
}
import { useState } from "react";

export function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
}

import React from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  dialog: boolean;
  setDialog: (value: boolean) => void;
  open?: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({ dialog, setDialog }) => {
  const navigate = useNavigate();
  function handlecancel() {
    setDialog(false);
    navigate("/");
  }
  return (
    <div>
      <dialog open={dialog}>
        <article>
          <p>API request success</p>
          <footer>
            <button onClick={handlecancel}>ok </button>
          </footer>
        </article>
      </dialog>
    </div>
  );
};
