import React, { useEffect, useState } from 'react';
import { hentAlleRegioner, opretEvent } from '../helpers/eventsAPI';
import { useHistory } from 'react-router-dom';
import '../scss/EventsAdmin.scss';
import ImageUploader from 'react-images-upload';

export default function EventsPost() {
  const [region, setRegion] = useState();
  const [evento, setEvento] = useState();
  const [bil, setBil] = useState();
  const his = useHistory();

  useEffect(() => {
    (async () => {
      hentAlleRegioner().then((reg) => {
        setRegion(reg);
      });
    })();
  }, []);

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

  const opretEventen = (e) => {
    e.preventDefault();
    
    opretEvent(evento, bil).then((e) => {console.log(e); his.push('/admin');});
    
  };

  return (
    <main>
      <form method="post" onSubmit={opretEventen}>
        <input
          type="text"
          name="titel"
          required
          onChange={(e) => setEvento({ ...evento, titel: e.target.value })}
        />
        <input
          type="dato"
          name="dato"
          required
          onChange={(e) => setEvento({ ...evento, dato: e.target.value })}
        />
        <input
          type="number"
          name="distance"
          required
          onChange={(e) => setEvento({ ...evento, distance: e.target.value })}
        />
        <input
          type="number"
          name="antalpladser"
          required
          onChange={(e) => setEvento({ ...evento, antalpladser: e.target.value })}
        />
        <input
          type="number"
          name="pris"
          required
          onChange={(e) => setEvento({ ...evento, pris: e.target.value })}
        />
        <textarea
          type="text"
          name="beskrivelse"
          required
          onChange={(e) => setEvento({ ...evento, beskrivelse: e.target.value })}
        />
        <select
        name="region"
        onChange={(e) => setEvento({ ...evento, region: e.target.value })}
        >
          {regionOptions}
        </select>
        <ImageUploader
          withIcon={true}
          name="billede"
          buttonText="Vælg et event billede"
          imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
          onChange={(billede) => setBil(billede[0])}
        />
        <button type="submit">Opret</button>
      </form>
    </main>
  );
}
