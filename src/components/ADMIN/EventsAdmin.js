import React, { useEffect, useState } from 'react';
import { hentAlleEvents } from '../helpers/eventsAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function EventsAdmin() {
  const [events, setEvents] = useState();

  useEffect(() => {
    (async () => {
      try {
        setEvents(await hentAlleEvents());
      } catch (err) {
        console.log('Fejl: ', err.message);
      }
    })();
  }, []);

  console.log(events);

  let eventListe = (
      <section>
          <h2>Ingen events tilbage!</h2>
      </section>
  );

  if (events && events.length) {
      eventListe = events.map((e) => {
          return (
              <section key={e._id}>
                <img src={'http://localhost:5021/images/events/' + e.billede} alt={e.titel}/>
                <p>{e.titel}</p>
                <p>{e.beskrivelse}</p>
                <p>{moment(e.dato).format('DD/MM/YYYY')} kl. {moment(e.dato).format('HH:mm')}</p>
                <p>{e.distance}</p>
                <p>{e.antalpladser}</p>
                <p>{e.pris}</p>
                {/* <p>{e.region.regionnavn}</p> */}
                <Link to={'/eventsput/' + e._id}>Ret</Link>
                <Link to={'/eventsdelete/' + e._id}>Slet</Link>
              </section>
          )
      });
  }

  return <section>
      <p>Events Admin</p>
      <Link to={'/eventspost'}>Ny event</Link>
      {eventListe}
  </section>;
}
