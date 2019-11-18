import React from "react";
import Logo from "../images/logo.svg";
import IconPlus from "../svg/IconPlus";
import Wen from "../svg/Wen";
import Person from "../svg/Person";

const Header = () => {
  return (
    <header>
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
        <li className="menu--right">
          <Person />
          Se connecter
        </li>
      </ul>
    </header>
  );
};

export default Header;
