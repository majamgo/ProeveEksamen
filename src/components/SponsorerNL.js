import React, { useState, useEffect } from 'react';
import { hentSponsorere } from './helpers/eventsAPI';
import './scss/NaesteLob.scss'

export default function SponsorerNL() {

    const [spons, setSpons] = useState();

    useEffect(() => {
        (async () => {
            try {
                setSpons(await hentSponsorere());               
            } catch (err) {
                console.log('Fejl: ', err);
            }
        })()
    }, []);

    // console.log(spons);
    let theSpons = <p>Ingen spons</p>;

    if (spons && spons.length) {
        theSpons = (
            <section className={(spons[1].sponsorkategori.kategori === 'Guld') ? 'spons-guldback nl-sponsorer' : (spons[1].sponsorkategori.kategori === 'Sølv') ? 'spons-sølvback nl-sponsorer' : 'spons-almenback nl-sponsorer'}>
                <h2>Sponsorer</h2>
                <figure>
                <img src={'http://localhost:5021/images/Sponsorer/' + spons[1].logo} alt={spons[1].navn} />
                </figure>
            </section>
        );
    };
    
    return (
        <section className="nl-spons">           
            {theSpons}
            </section>
    );
};