import React, { useState, useEffect } from "react";
import "./AddLibrarianPopup.css";
import { IoMdClose } from "react-icons/io";

export default function AddLibrarianPopup({
  librarian,
  message,
  onCancel,
  onConfirm,
}) {
  const [modal, setModal] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    if (librarian) {
      setUsername(librarian.username);
      setEmail(librarian.email);
    }
  }, [librarian]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const libData = {

      user_id: librarian.id,
      username: username,
      email: email,
    

    };
    onConfirm(libData);
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
            <h2>Modify librarian credentials</h2>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
