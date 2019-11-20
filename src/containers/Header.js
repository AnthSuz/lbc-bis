import React, { useState } from "react";
import Logo from "../images/logo.svg";
import IconPlus from "../svg/IconPlus";
import Wen from "../svg/Wen";
import Person from "../svg/Person";
import Modal from "../components/Modal";
import Cookie from "js-cookie";

const Header = props => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setUser={props.setUser}
      />
      <ul className="container  menu">
        <li>
          <ul className="menu--left">
            <li>
              <img src={Logo} alt="logo" />
            </li>
            <li>
              <button className="publish--offer">
                <IconPlus />
                Deposer une annonce
              </button>
            </li>
            <li>
              <button className="search--button">
                <Wen />
                Rechercher
              </button>
            </li>
          </ul>
        </li>
        {props.user.token ? (
          <>
            <Person />

            <li
              onClick={() => {
                // Log Out

                // Mettre à jour l'état user
                props.setUser({});

                // Supprimer le cookie token
                Cookie.remove("token");
              }}
            >
              Se déconnecter
            </li>
          </>
        ) : (
          <>
            <Person />
            <li
              onClick={() => {
                setShowModal(true);
              }}
            >
              Se connecter
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
