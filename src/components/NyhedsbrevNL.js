import React, { useState } from 'react';
import { opretNyhedsbrev } from './helpers/eventsAPI';
import Nyhedsbrev from '../images/newsletter.png';
import './scss/NaesteLob.scss';

export default function NyhedsbrevNL() {

    const [nyhedsbrev, setNyhedsbrev] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        opretNyhedsbrev(nyhedsbrev).then((data) => {console.log(data); alert('Du er nu tilmeldt!');});
      };

    return (
        <section className="nl-nyhedsbrev">
          <figure className="nl-billede">
            <img src={Nyhedsbrev} alt="Nyhedsbrev"/>
            </figure>
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="Din Email"
            name="email"
            type="email"
            onChange={(e) =>
              setNyhedsbrev({email: e.target.value})}
          />
          <button type="submit">Tilmeld</button>
        </form>
        </section>
    );
}