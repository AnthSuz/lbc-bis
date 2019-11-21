// -----  IMPORT DE REACT -----
import React, { useState } from "react";
import Logo from "../images/logo.svg";
import IconPlus from "../svg/IconPlus";
import Wen from "../svg/Wen";
import Person from "../svg/Person";
import Modal from "../components/Modal";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
const Header = props => {
  return (
    <header>
      <Modal
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        setUser={props.setUser}
      />
      <ul className="container  header--menu">
        <li>
          <ul className="header--menu--left">
            <Link to="/">
              <li>
                <img src={Logo} alt="logo" />
              </li>
            </Link>
            <Link to="/publish">
              <li>
                <button className="header--publish--offer">
                  <IconPlus />
                  Deposer une annonce
                </button>
              </li>
            </Link>
            <li>
              <button className="header--search--button">
                <Wen />
                Rechercher
              </button>
            </li>
          </ul>
        </li>
        {props.user.token ? (
          <>
            <li
              className="header--person"
              onClick={() => {
                // Log Out

                // Mettre à jour l'état user
                props.setUser({});

                // Supprimer le cookie token
                Cookie.remove("token");
              }}
            >
              <Person />
              Se déconnecter
            </li>
          </>
        ) : (
          <>
            <li
              className="header--person"
              onClick={() => {
                props.setShowModal(true);
              }}
            >
              <Person />
              Se connecter
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
