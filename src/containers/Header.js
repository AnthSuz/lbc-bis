import React, { useState } from "react";
import Logo from "../images/logo.svg";
import IconPlus from "../svg/IconPlus";
import Wen from "../svg/Wen";
import Person from "../svg/Person";
import Modal from "../components/Modal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header>
      <Modal showModal={showModal} setShowModal={setShowModal} />
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
        <li
          onClick={() => {
            setShowModal(true);
          }}
          className="menu--right"
        >
          <Person />
          Se connecter
        </li>
      </ul>
    </header>
  );
};

export default Header;
