import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hentAlleEvents } from './helpers/eventsAPI';
import './scss/Events.scss';
import moment from 'moment';

export default function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    (async () => {
      try {
        setEvents(await hentAlleEvents());
      } catch (err) {
        console.log('Fejl: ' + err);
      }
    })();
  }, []);

  console.log(events);

  let eventsListe = '';

  if (events && events.length) {
    eventsListe = events.map((e) => {
      return (
        <section key={e._id} className="events-enevent">
          {/* <figure className={{ height: 60, width: '100%', backgroundImage: 'url('+'http://localhost:5021/images/events/' + e.billede+')' }}></figure> */}
          <img
            src={'http://localhost:5021/images/events/' + e.billede}
            alt={e.titel}
          />
          <div className="events-eventinfo">
            <h4>{e.titel}</h4>
            <h6>
              D. {moment(e.dato).format('DD/MM')} kl.{' '}
              {moment(e.dato).format('HH:mm')}
            </h6>
            <p>
              {e.beskrivelse.length > 100 ? (
                e.beskrivelse.substr(0, 100) + '...'
              ) : (
                e.beskrivelse
              )}
            </p>
            <h4>Pris: {e.pris} kr.</h4>
            <Link to={'/events/' + e._id}>
              <button className="events-knap">Læs mere</button>
            </Link>
          </div>
        </section>
      );
    });
  } else {
    return (
      <section>
        <h2>Ingen Events!</h2>
      </section>
    );
  }

  // const handleClick = (e) => {
  //     e.preventDefault();
  //     if (e.value === 'u10') {
  //         eventsListe = events.filter((ev) => ev.distance < 10000).map((e) => {
  //             return (
  //                 <section key={e._id}>
  //                     <img src={'http://localhost:5021/images/events/' + e.billede} alt={e.titel}/>
  //                     <h4>{e.titel}</h4>
  //                     <h6>{e.dato}</h6>
  //                     <p>{e.beskrivelse}</p>
  //                     <h4>Pris: {e.pris} kr.</h4>
  //                     <Link to={'/events/' + e._id}>
  //                     <button>Læs mere</button></Link>
  //                 </section>
  //             )
  //         });
  //     } else if (e.value === 'o10') {
  //         eventsListe = events.filter((ev) => ev.distance > 10000).map((e) => {
  //             return (
  //                 <section key={e._id}>
  //                     <img src={'http://localhost:5021/images/events/' + e.billede} alt={e.titel}/>
  //                     <h4>{e.titel}</h4>
  //                     <h6>{e.dato}</h6>
  //                     <p>{e.beskrivelse}</p>
  //                     <h4>Pris: {e.pris} kr.</h4>
  //                     <Link to={'/events/' + e._id}>
  //                     <button>Læs mere</button></Link>
  //                 </section>
  //             )
  //     })}};

  return (
    <main className="main-events">
      <section className="events-alt">
        <section className="events-indkreds">
          <h4>Indkreds</h4>
          <h5>Distance</h5>
          <div>
            <div className="events-checkbox">
              <input type="checkbox" />
              <p>Over 10 km</p>
            </div>
            <div className="events-checkbox">
              <input type="checkbox" />
              <p>Under 10 km</p>
            </div>
          </div>
          <h5>Hvor i landet</h5>
          <select>
            <option>Nordjylland</option>
          </select>
        </section>

        <section className="events-alle">
          <h3>Alle events</h3>
          <section className="events-everything">{eventsListe}</section>
        </section>
      </section>
    </main>
  );
}
