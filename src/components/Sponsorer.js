import React, { useState, useEffect } from 'react';
import { hentSponsorere } from './helpers/eventsAPI';
import './scss/Sponsorer.scss';

export default function Sponsorer() {
  const [sponser, setSponser] = useState();

  useEffect(() => {
    (async () => {
      try {
        setSponser(await hentSponsorere());
      } catch (err) {
        console.log('Fejl: ', err.message);
      }
    })();
  }, []);

  let guld = '';
  let sølv = '';
  let almen = '';

  if (sponser && sponser.length) {
    guld = sponser
      .filter((spons) => spons.sponsorkategori.kategori === 'Guld')
      .map((g) => (
        <img className="spons-guldbil"
          key={g._id}
          src={'http://localhost:5021/images/sponsorer/' + g.logo}
          alt={g.navn}
        />
      ));
    sølv = sponser
      .filter((spons) => spons.sponsorkategori.kategori === 'Sølv')
      .map((s) => (
        <img className="spons-sølvbil"
          key={s._id}
          src={'http://localhost:5021/images/sponsorer/' + s.logo}
          alt={s.navn}
        />
      ));
    almen = sponser
      .filter(
        (spons) =>
          spons.sponsorkategori.kategori === 'Almindelig samarbejdspartner'
      )
      .map((a) => (
        <img className="spons-sølvbil"
          key={a._id}
          src={'http://localhost:5021/images/sponsorer/' + a.logo}
          alt={a.navn}
        />
      ));
  }

  // console.log(sponser);
  // console.log(guld);
  // console.log(sølv);
  // console.log(almen);

  return (
    <main className="spons-main">
      <section className="spons-alt">
        <div className="spons-h2">
          <h2>Guld sponsorer</h2>
        </div>
        <section className="spons-data">{guld}</section>
        <div className="spons-h2">
          <h2>Sølv sponsorer</h2>
        </div>
        <section className="spons-data">{sølv}</section>
        <div className="spons-h2">
          <h2>Almindelige samarbejdspartnere</h2>
        </div>
        <section className="spons-data">{almen}</section>
      </section>
    </main>
  );
}
