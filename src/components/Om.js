import React, { useState, useEffect } from 'react';
import { hentAlleOm } from './helpers/eventsAPI';
import './scss/Om.scss';

export default function Om() {
  const [om, setOm] = useState();
  let omText = '';

  useEffect(() => {
    hentAlleOm().then(setOm);
  }, []);

  //console.log(om);

  if (om && om.length) {
    omText = om.map((o) => {
      return (
        <section key={o._id} className="om-alt">
          <img
            src={'http://localhost:5021/images/omos/' + om.billede}
            alt={om.overskrift}
          />
          <div>
            <h2>{o.overskrift}</h2>
            <p>{o.beskrivelse}</p>
          </div>
        </section>
      );
    });
  }

  return <main className="om-main">{omText}</main>;
}
