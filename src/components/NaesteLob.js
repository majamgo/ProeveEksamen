import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hentEvent } from './helpers/eventsAPI';
import moment from 'moment';
import './scss/NaesteLob.scss';
import SponsorerNL from './SponsorerNL';
import NyhedsbrevNL from './NyhedsbrevNL';

export default function NaesteLob() {
  const [event, setEvent] = useState();
  const dato = moment().format('YYYY-MM-DD');

  useEffect(
    () => {
      hentEvent(dato).then((res) => {
        const respons = res.filter((e) => e.pladsertilbage !== 0);
        setEvent(respons);
      });
    },
    [dato]
  );

  //console.log(event);

  let eventen = '';

  if (event && event.length) {
    eventen = (
      <section>
        <div className="nl-pladser">
          <p>
            Næste løb - {event[0].pladsertilbage} / {event[0].antalpladser}{' '}
            pladser ledige
          </p>
        </div>
        <section className="nl-nl">
          <h2>{event[0].titel}</h2>
          <h6>
            D.{moment(event[0].dato).format('DD/MM')} kl.{' '}
            {moment(event[0].dato).format('HH:mm')}
          </h6>
          <p>{event[0].beskrivelse}</p>
          <h4>Pris: {event[0].pris} kr.</h4>
          <Link to={'/events/' + event[0]._id}>
            <button className="nl-knap">Læs mere</button>
          </Link>
        </section>
      </section>
    );
  } else {
    eventen = (
      <section>
        <h2>Kan ikke vise event!</h2>
      </section>
    );
  }

  return (
    <main className="naestelob">
      {eventen}
      <NyhedsbrevNL />
      <SponsorerNL />
    </main>
  );
}
