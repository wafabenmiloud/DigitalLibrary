import React, { useState } from "react";
import "./AddLibrarianPopup.css";
import { IoMdClose } from "react-icons/io";

export default function AddBookPopup({ message, onCancel, onConfirm }) {
  const [modal, setModal] = useState(true);
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [ISBN, setISBN] = useState("");
  const [theme, setTheme] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      titre: titre,
      auteur: auteur,
      ISBN: ISBN,
      theme: theme,
    };
    onConfirm(bookData);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <div
            className="modal-content-buttons"
            style={{ justifyContent: "flex-end" }}
          >
            <IoMdClose className="close-modal" onClick={onCancel} />
          </div>
          <form onSubmit={handleFormSubmit}>
            <h2>Add a book</h2> <label>
              Réference :
              <input
                type="text"
                name="refe"
                id="refe"

                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
                required
              />
            </label>
            <label>
              Title :
              <input
                type="text"
                name="title"
                id="title"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />
            </label>
            <label>
              Author :
              <input
                type="text"
                  name="author"
                id="author"
                value={auteur}
                onChange={(e) => setAuteur(e.target.value)}
                required
              />
            </label>
            <label>
              Theme :
              <input
                type="text"
                  name="theme"
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                required
              />
            </label>
           

            <div className="modal-content-buttons">
              <button type="submit" className="open-modal">
                Confirm
              </button>
            </div>
            <br />
            <p>{message}</p>
          </form>
        </div>
      </div>
    </>
  );
}
