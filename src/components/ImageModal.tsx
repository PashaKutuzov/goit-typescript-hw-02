import { useEffect } from "react";
import * as React from "react";
import Modal from "react-modal";
import { PhotoType } from "../type";
Modal.setAppElement("#root");


type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: PhotoType | null ;
};


export default function ImageModal({ isOpen, onClose, image }:ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
         {image && <img src={image.urls.regular} alt={image.alt_description} />}
      </div>
    </Modal>
  );
}
