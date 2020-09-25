import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { hentEnEvent, opretEventtilmelding } from './helpers/eventsAPI';
import moment from 'moment';
import './scss/Event.scss';

export default function Event() {
  const [event, setEvent] = useState();
  const { eventid } = useParams();
  const [eventtilmelding, setEventtilmelding] = useState();
  const his = useHistory();

  useEffect(
    () => {
      (async () => {
        try {
          setEvent(await hentEnEvent(eventid));
        } catch (err) {
          console.log('Fejl: ' + err.message);
        }
      })();
    },
    [eventid]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    opretEventtilmelding(eventtilmelding).then((data) => {console.log(data); his.push('/events');});
  };

  //console.log(event);

  let eventen = '';

  if (event) {
    eventen = (
      <section className="event-alt" key={event._id}>
        <figure className="event-billede">
          <img
            src={'http://localhost:5021/images/events/' + event.billede}
            alt={event.titel}
          />
        </figure>
        <section className="event-info">
          <h1>{event.titel}</h1>
          <h6>D. {moment(event.dato).format('DD/MM')} kl.{' '}
              {moment(event.dato).format('HH:mm')}</h6>
          <p>{event.beskrivelse}</p>
          <h5>Region: {event.region.regionnavn}</h5>
          <h5>Distance: {event.distance}</h5>
          <h4>Pris {event.pris} KR.</h4>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Tilmeldelse email"
              name="email"
              type="email"
              onChange={(e) =>
                setEventtilmelding({
                  ...eventtilmelding,
                  email: e.target.value,
                  event: event._id,
                })}
            />
            <button type="submit">Tilmeld</button>
          </form>
        </section>
      </section>
    );
  } else {
    eventen = (
      <section>
        <h1>Kan ikke vise event!</h1>
      </section>
    );
  }

  return <main className="main-event">{eventen}</main>;
}
