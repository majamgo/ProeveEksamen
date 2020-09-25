import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { sletEvent, hentEnEvent } from '../helpers/eventsAPI';
import '../scss/EventsAdmin.scss';

export default function EventsDelete() {
  const [eventen, setEventen] = useState();
  const { eventid } = useParams();
  const his = useHistory();

  useEffect(
    () => {
      (async () => {
        hentEnEvent(eventid).then((e) => {
          console.log(e);

          setEventen({
            billede: e.billede,
            titel: e.titel,
            beskrivelse: e.beskrivelse,
            dato: e.dato,
            distance: e.distance,
            antalpladser: e.antalpladser,
            pris: e.pris,
            region: e.region._id,
          });
        });
      })();
    },
    [eventid]
  );

  const sletEventen = (e) => {
    e.preventDefault();

    sletEvent(eventid).then((data) => {console.log(data); his.push('/admin');});
    
  };

  let sleeteveent = '';

  if (eventen) {
    sleeteveent = (
      <section key={eventen._id}>
        <h2>{eventen.titel}</h2>
        <p>{eventen.beskrivelse}</p>
        <button type="button" onClick={sletEventen}>
          Slet
        </button>
      </section>
    );
  }

  return <main>
      <p>Slet denne grimme event?</p>
      {sleeteveent}</main>;
}
