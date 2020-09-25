import React, { useState, useEffect } from 'react';
import { hentAlleBestyrelse, opretKontakt } from './helpers/eventsAPI';
import './scss/Kontakt.scss';

export default function Kontakt() {
  const [kontakt, setKontakt] = useState();
  const [bestyrelse, setBestyrelse] = useState();
  const [bestyrer, setBestyrer] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    opretKontakt(kontakt).then((data) => {console.log(data); alert('Din besked er sendt!');});
  };

  useEffect(() => {
    (async () => {
      try {
        setBestyrelse(await hentAlleBestyrelse());
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  let bestyrelseOptions;

  if (bestyrelse && bestyrelse.length) {
    bestyrelseOptions = bestyrelse.map((be, i) => {
      return (
        <option value={be._id} key={be._id}>
          {be.bestyrelsespost.post} - {be.fornavn} {be.efternavn}
        </option>
      );
    });
  }

  let medlem = '';

  if (bestyrer && bestyrer.length) {
    medlem = bestyrelse.filter((b) => b._id === bestyrer).map((be) => (
      <section key={be._id} className="kontakt-medlem">
        <img
          src={'http://localhost:5021/images/Bestyrelse/' + be.billede}
          alt={be.fornavn}
        />
        <section className="kontakt-medleminfo">
          <h3>
            {be.fornavn} {be.efternavn}
          </h3>
          <h6>{be.bestyrelsespost.post}</h6>
          <p>{be.beskrivelse}</p>
          <h4>Email: {be.email}</h4>
        </section>
      </section>
    ));
  }

  console.log(bestyrelse);
  console.log(bestyrer);

  return (
    <main className="kontakt-main">
      <section className="kontakt-alt">
        <section className="kontakt-kontaktinfo">
          <h2>Kontakt os</h2>
          <p>Vi bestræber os for at give svar inden for 48 timer.</p>
          <form className="kontakt-form" onSubmit={handleSubmit}>
            <label>Dit navn</label>
            <input
              type="text"
              name="navn"
              required
              onChange={(e) => setKontakt({ ...kontakt, navn: e.target.value })}
            />
            <label>Din email</label>
            <input
              type="email"
              name="emailadresse"
              required
              onChange={(e) =>
                setKontakt({ ...kontakt, emailadresse: e.target.value })}
            />
            <label>Emne (Fx. løbs navn el. lignende</label>
            <input
              type="text"
              name="emne"
              required
              onChange={(e) => setKontakt({ ...kontakt, emne: e.target.value })}
            />
            <label>Besked</label>
            <textarea
              type="message"
              name="besked"
              required
              onChange={(e) =>
                setKontakt({ ...kontakt, besked: e.target.value })}
            />
            <button type="submit">Send besked</button>
          </form>
        </section>

        <section className="kontakt-bestyrelseinfo">
          <h3>Her finder du information om vores bestyrelse</h3>
          <select
            defaultValue={'Start'}
            onChange={(e) => setBestyrer(e.target.value)}
          >
            <option value="Start" disabled>
              Vælg en bestyrer
            </option>
            {bestyrelseOptions}
          </select>
          {medlem}
        </section>
      </section>
    </main>
  );
}
