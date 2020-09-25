import axios from 'axios';

// BASE URL
const eventsAPI = {
    baseUrl: 'http://localhost:5021/'
}


//********* EVENTS *********//

// GET alle events
export const hentAlleEvents = async () => {
    console.log('HENT ALLE EVENTS');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'event');
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
}

// GET en event fra id
export const hentEnEvent = async (eventid) => {
    console.log('HENT EN EVENT');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'event/' + eventid);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
};

// POST en event (ADMIN)
export const opretEvent = async (evento, billededata) => {
    console.log('OPRET EN EVENT');
    try {
        const fdata = new FormData();
        fdata.append('event', JSON.stringify(evento));
        fdata.append('billede', billededata);

        let res = await axios.post(eventsAPI.baseUrl + 'event/admin', fdata);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};

// PUT en event (ADMIN)
export const retEvent = async (eventid, evento, billededata) => {
    console.log('RET EN EVENT');
    try {
        const fdata = new FormData();
        fdata.append('event', JSON.stringify(evento));
        fdata.append('billede', billededata);

        let res = await axios.put(eventsAPI.baseUrl + 'event/admin/' + eventid, fdata);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
};

// DELETE en event (ADMIN)
export const sletEvent = async (eventid) => {
    console.log('SLET EN EVENT');
    try {
        let res = await axios.delete(eventsAPI.baseUrl + 'event/admin/' + eventid);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};


//********* EVENTTILMELDING *********//

// POST en event tilmelding
export const opretEventtilmelding = async (eventtilmelding) => {
    try {
        let res = await axios.post(eventsAPI.baseUrl + 'eventtilmelding', eventtilmelding);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};


//********* NYHEDSBREV *********//

// POST en nyhedsbrev
export const opretNyhedsbrev = async (nyhedsbrev) => {
    try {
        let res = await axios.post(eventsAPI.baseUrl + 'nyhedsbrevtilmelding', nyhedsbrev);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};


//********* REGION *********//

// GET alle regioner
export const hentAlleRegioner = async () => {
    console.log('HENT ALLE REGIONER');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'region');
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
}

// GET en region
export const hentEnRegion = async (eventid) => {
    console.log('HENT EN REGION');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'region/' + eventid);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
};


//********* BESTYRELSE *********//

// GET alle bestyrelser
export const hentAlleBestyrelse = async () => {
    console.log('HENT ALLE BESTYRELSE');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'bestyrelse');
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
}

// GET en bestyrelse
export const hentEnBestyrelse = async (bestyrelseid) => {
    console.log('HENT EN BESTYRELSE');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'bestyrelse/' + bestyrelseid);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
};


//********* KOMMENDE LØB *********//

// GET en event - Kommende Løb
export const hentEvent = async (eventTid) => {
    console.log('HENT EN EVENT');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'event/soegdato?dato_fra=' + eventTid);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    };
};


//********* SPONSOERE *********//

// GET alle sponsorere - Kommende Løb
export const hentSponsorere = async () => {
    console.log('HENT ALLE SPONSORER');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'sponsor');
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};


//********* KONTAKT *********//

// POST en kontaktformular
export const opretKontakt = async (kontakt) => {
    console.log('OPRET EN KONTAKT');
    try {
        let res = await axios.post(eventsAPI.baseUrl + 'kontakt', kontakt);
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};


//********* OM *********//

// GET alle om
export const hentAlleOm = async () => {
    console.log('HENT ALLE OM');
    try {
        let res = await axios.get(eventsAPI.baseUrl + 'omos');
        return res.data;
    } catch (err) {
        console.log('Fejl: ', err.message);
        return Promise.reject(err);
    }
};