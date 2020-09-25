import React, { useEffect, useState } from 'react';
import { hentEvent } from './helpers/eventsAPI';
import moment from 'moment';
import './scss/Home.scss';

export default function Home() {
  const [event, setEvent] = useState();
  const dato = moment().format('YYYY-MM-DD');
  let resDato;
  let eventNavn;

  useEffect(
    () => {
      hentEvent(dato).then((res) => {
        const respons = res.filter((e) => e.pladsertilbage !== 0);
        setEvent(respons);
      });
    },
    [dato]
  );

  if (event && event.length) {
    resDato = moment(event[0].dato).format('YYYY-MM-DD');
    eventNavn = <h2>{event[0].titel}</h2>;
  }

  console.log(resDato);

  const calculateTimeLeft = () => {
    const difference = +new Date('2020-10-15') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dage: Math.floor(difference / (1000 * 60 * 60 * 24)),
        timer: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutter: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <h2>
        {timeLeft[interval]} {interval}{' '}
      </h2>
    );
  });

  console.log(event);

  return (
    <main className="home-main">
      <section className="home-countdown">
        {timerComponents.length ? timerComponents : <p>In game</p>} <h2>til</h2>{' '}
        {eventNavn}
      </section>
    </main>
  );
}
