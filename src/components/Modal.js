import React, { useState } from "react";
import Close from "../svg/Close";

const Modal = props => {
  return (
    <>
      {props.showModal === false ? null : (
        <div className="modal">
          <span
            className="modal--close"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            <Close />
          </span>
          <div className="modal--content">
            <div className="modal--container">
              <p className="modal-title">Connexion</p>
              <form>
                <p>Adresse email</p>
                <input type="text" />
                <p>Mot de passe</p>
                <input type="text" />
                <button>Se connecter</button>
              </form>
            </div>
            <hr />
            <div className="modal--container">
              <div className="modal--bottom">
                <p>Vous n'avez pas de compte ?</p>
                <button>Créer un compte</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
