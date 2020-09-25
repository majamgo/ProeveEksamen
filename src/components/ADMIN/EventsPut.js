import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { hentAlleRegioner, hentEnEvent, retEvent } from '../helpers/eventsAPI';
import '../scss/EventsAdmin.scss';
import ImageUploader from 'react-images-upload';

export default function EventsPut() {
  const [eventen, setEventen] = useState();
  const [eventBillede, setEventBillede] = useState();
  const [region, setRegion] = useState();
  const { eventid } = useParams();
  const his = useHistory();

  useEffect(
    () => {
      (async () => {
        try {
          setRegion(await hentAlleRegioner());
        } catch (err) {
          console.log('Fejl: ' + err.message);
        }
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

  let regionOptions;

  if (region && region.length) {
    regionOptions = region.map((reg, i) => {
      return (
        <option value={reg._id} key={reg._id}>
          {reg.regionnavn}
        </option>
      );
    });
  }

  const retEventen = (e) => {
    e.preventDefault();

    retEvent(eventid, eventen, eventBillede).then((data) => {console.log(data); his.push('/admin');});
    console.log(eventen);
    
  };

  console.log(eventen);
  let rettetEvent = '';

  if (eventen) {
    rettetEvent = (
      <form onSubmit={retEventen}>
        <input
          type="text"
          name="titel"
          required
          defaultValue={eventen.titel}
          onChange={(e) => setEventen({ ...eventen, titel: e.target.value })}
        />
        <input
          type="dato"
          name="dato"
          required
          defaultValue={eventen.dato}
          onChange={(e) => setEventen({ ...eventen, dato: e.target.value })}
        />
        <input
          type="number"
          name="distance"
          required
          defaultValue={eventen.distance}
          onChange={(e) => setEventen({ ...eventen, distance: e.target.value })}
        />
        <input
          type="number"
          name="antalpladser"
          required
          defaultValue={eventen.antalpladser}
          onChange={(e) =>
            setEventen({ ...eventen, antalpladser: e.target.value })}
        />
        <input
          type="number"
          name="pris"
          required
          defaultValue={eventen.pris}
          onChange={(e) => setEventen({ ...eventen, pris: e.target.value })}
        />
        <textarea
          type="text"
          name="beskrivelse"
          required
          defaultValue={eventen.beskrivelse}
          onChange={(e) =>
            setEventen({ ...eventen, beskrivelse: e.target.value })}
        />
        <select
          defaultValue={eventen.region}
          onChange={(e) => setEventen({ ...eventen, region: e.target.value })}
        >
          {regionOptions}
        </select>
        <img
          src={'http://localhost:5021/images/events/' + eventen.billede}
          alt={eventen.titel}
        />
        <ImageUploader
          withIcon={true}
          buttonText='Vælg et event billede'
          imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
          maxFileSize={5242880}
          withPreview={true}
          name="billede"
          onChange={(billede) => {
            setEventBillede(billede[0]);
          }}
        />
        <button type="submit" >
            Ret
        </button>
      </form>
    );
  }

  // console.log(retEvent);

  return (
    <main>
      <p>Ret event</p>
      {rettetEvent}
    </main>
  );
}
