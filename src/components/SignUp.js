import React, { useState } from "react";
import Watch from "../svg/Watch";
import Cloche from "../svg/Cloche";
import Eye from "../svg/Eye";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState({
    status: false,
    message: ""
  });

  let history = useHistory();

  const fetchSignUp = async () => {
    try {
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/api/user/sign_up",
        {
          email: mail,
          password: password,
          username: pseudo
        }
      );
      if (response.data.token) {
        // 1. sauvegarder le token dans les cookies
        Cookie.set("token", response.data.token);

        // 2. redirige vers la page offers

        // 3. Mettre à jour l'état user
        props.setUser({ token: response.data.token });
        history.push("/");
        // console.log(response.data.status);
      } else {
        alert("mot de passe/email faux");
        console.log("faux");
      }
      console.log(response.data);
      console.log("password ===>", password);
    } catch (err) {
      console.log(err.message);
      console.log("maison");
    }
  };

  return (
    <div className="container">
      <div className="inside--signup box-shadow">
        <div className="left--signup ">
          <h2>Pour créer un compte ?</h2>
          <div className="watch">
            <div className="logo--inside">
              <Watch />
            </div>
            <div className="txt--inside">
              <p className="mini-title">Gagnez du temps</p>
              <p>
                Publiez vos annonces rapidement, avec vos informations
                pré-remplies chaque fois que vous souhaitez déposer une nouvelle
                annonce.
              </p>
            </div>
          </div>

          <div className="watch">
            <div className="logo--inside">
              <Cloche />
            </div>
            <div className="txt--inside">
              <p className="mini-title">Soyez les premiers informés</p>
              <p>
                Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
                qui vous intéresse.
              </p>
            </div>
          </div>

          <div className="watch">
            <div className="logo--inside">
              <Eye />
            </div>
            <div className="txt--inside">
              <p className="mini-title">Visibilité</p>
              <p>
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus).
              </p>
            </div>
          </div>
        </div>

        {/* SEPARATEUR */}
        <div className="right--signup ">
          <h2>Créez un compte</h2>
          <form
            onSubmit={event => {
              event.preventDefault();
              if (password !== confirmPassword) {
                setSignUpError({
                  status: true,
                  message: "Mot de passe non identique"
                });
              } else if (password.length < 6) {
                setSignUpError({
                  status: true,
                  message: "Mot de passe minimum 6 caractères"
                });
                // console.log(signUpError);
              } else if (pseudo.length === 0) {
                setSignUpError({
                  status: true,
                  message: "Renseignez un pseudo"
                });
              } else if (mail.length === 0) {
                setSignUpError({
                  status: true,
                  message: "Renseignez un email"
                });
              } else {
                fetchSignUp();
                setSignUpError({
                  status: false,
                  message: ""
                });
              }
            }}
          >
            <div className="pseudo-email">
              <p>Pseudo *</p>
              <input
                type="text"
                onChange={event => {
                  setPseudo(event.target.value);
                }}
              />
              <p>Adresse email *</p>
              <input
                type="text"
                onChange={event => {
                  setMail(event.target.value);
                }}
              />
            </div>

            <div className="mdp">
              <div>
                <p>Mot de passe *</p>
                <input
                  type="text"
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Confirmer le mot de passe*</p>
                <input
                  type="text"
                  onChange={event => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <br />
            <div className="checkbox">
              <input type="checkbox" />

              <span>
                « J’accepte les Conditions Générales de Vente et  les Conditions
                Générales d’Utilisation »
              </span>
              {signUpError.status === true ? (
                <p className="error-log">{signUpError.message}</p>
              ) : null}
            </div>
            {/* {signUpError.message} */}
            <div className="button-created">
              <input type="submit" value="Créer mon Compte Personnel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
