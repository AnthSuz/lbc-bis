import React from "react";
import Watch from "../svg/Watch";
import Cloche from "../svg/Cloche";
import Eye from "../svg/Eye";

const SignUp = () => {
  return (
    <div className="container">
      <div className="signup">
        <div className="left--signup">
          <h3>Pourquoi créer un compte ?</h3>
          <div className="part">
            <div className="logo">
              {" "}
              <Watch />
            </div>

            <div className="text">
              <h4>Gagnez du temps</h4>
              <p>
                Gagnez du temps Publiez vos annonces rapidement, avec vos
                informations pré-remplies chaque fois que vous souhaitez déposer
                une nouvelle annonce.
              </p>
            </div>
          </div>
          <div className="part">
            <div className="logo">
              {" "}
              <Cloche />
            </div>

            <div className="text">
              <h4>Soyez les premiers informés</h4>
              <p>
                Soyez les premiers informés Créez des alertes Immo ou Emploi et
                ne manquez jamais l’annonce qui vous intéresse.
              </p>
            </div>
          </div>
          <div className="part">
            <div className="logo">
              {" "}
              <Eye />
            </div>

            <div className="text">
              <h4>Visibilité</h4>
              <p>
                Visibilité Suivez les statistiques de vos annonces (nombre de
                fois où votre annonce a été vue, nombre de contacts reçus).
              </p>
            </div>
          </div>
        </div>

        <div className="right--signup">
          <h3>Créez un compte</h3>
          <div className="pseudoemail">
            <p className="form">Pseudo *</p>
            <input type="text" />
            <p className="form">Adresse email *</p>
            <input type="text" />
          </div>

          <div className="mdp">
            <div>
              <p>Mot de passe *</p>
              <input type="text" />
            </div>
            <div>
              <p>Confirmer le mot de passe *</p>
              <input type="text" />
            </div>
          </div>
          <input type="checkbox" />
          <span>
            « J’accepte les Conditions Générales de Vente et  les Conditions
            Générales d’Utilisation »
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
