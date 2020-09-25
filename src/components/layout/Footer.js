import React from 'react';
import '../scss/Footer.scss';
import logo from '../../images/logobot.png';

export default function Footer() {
  return (
    <footer>
      <figure>
        <img src={logo} alt="RUN'IT logo" />
      </figure>
    </footer>
  );
}
