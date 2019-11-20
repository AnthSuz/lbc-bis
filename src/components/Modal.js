import React, { useState } from "react";
import Close from "../svg/Close";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
const Modal = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <p className="modal--title">Connexion</p>
              <form
                className="modal--form"
                onSubmit={async event => {
                  event.preventDefault();

                  try {
                    const response = await axios.post(
                      "https://leboncoin-api.herokuapp.com/api/user/log_in",
                      {
                        email: email,
                        password: password
                      }
                    );
                    if (response.data.token) {
                      // 1. sauvegarder le token dans les cookies
                      Cookie.set("token", response.data.token);

                      // 2. fermer la modal
                      props.setShowModal(false);

                      // 3. Mettre à jour l'état user
                      props.setUser(response.data);
                      // console.log(response.data.status);
                    } else {
                      alert("mot de passe/email faux");
                      console.log("faux");
                    }
                  } catch (error) {
                    if (
                      error.message === "Request failed with status code 400"
                    ) {
                      alert("email ou password incorrect");
                    } else {
                      alert(error.message);
                    }
                  }
                }}
              >
                <p>Adresse email</p>
                <input
                  type="email"
                  onChange={event => {
                    setEmail(event.target.value);
                  }}
                />
                <p>Mot de passe</p>
                <input
                  type="text"
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
                <input type="submit" className="modall--input--button" />
              </form>
            </div>
            <hr />
            <div className="modal--container">
              <div className="modal--bottom">
                <p>Vous n'avez pas de compte ?</p>
                <Link to="/SignUp">
                  <button
                    onClick={() => {
                      props.setShowModal(false);
                    }}
                  >
                    Créer un compte
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
