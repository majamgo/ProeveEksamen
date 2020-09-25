import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../scss/Header.scss';
import { GoThreeBars } from 'react-icons/go';
import logo from '../../images/logo.jpg';
import knap from '../../images/Arrow.png';

export default function Header() {

    const [navOpened, setNavOpened] = useState();

    const navbarmenu = navOpened ? 'bignav-menu bignav-menu-active' : 'bignav-menu'

  return (
    <header>
      <nav className="main-navbar">

    <span className="nav-toggle" onClick={() => {setNavOpened(!navOpened)}} >
        <GoThreeBars />
    </span>

        <ul className={navbarmenu}>
          <li>
            <NavLink to="/events">Events |</NavLink>
          </li>
          <li>
            <NavLink to="/sponsorer">Sponsorer |</NavLink>
          </li>
          <li>
            <NavLink to="/omrunit">Om Runit |</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt">Kontakt os |</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </ul>
        <div className="nav-search">
          <button>SØG</button>
          <input type="text"/>
          <img src={knap} alt="avanceret søg"/>
          <p>Avanceret søg</p>
        </div>
      </nav>
      <figure>
          <NavLink to ="/">
          <img src={logo} alt="Run'it logo"/>
          </NavLink>
      </figure>
    </header>
  );
}
