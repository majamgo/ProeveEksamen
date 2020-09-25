import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import NaesteLob from './components/NaesteLob';
import Events from './components/Events';
import Event from './components/Event';
import Footer from './components/layout/Footer';
import Sponsorer from './components/Sponsorer';
import Om from './components/Om';
import Kontakt from './components/Kontakt';
import Admin from './components/ADMIN/Admin';
import EventsPost from './components/ADMIN/EventsPost';
import EventsPut from './components/ADMIN/EventsPut';
import EventsDelete from './components/ADMIN/EventsDelete';

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <section className="App-main">
          <section className="App-Switch">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/events/:eventid" component={Event} />
              <Route exact path="/sponsorer" component={Sponsorer} />
              <Route exact path="/omrunit" component={Om} />
              <Route exact path="/kontakt" component={Kontakt} />

              <Route exact path="/admin" component={Admin} />
              <Route exact path="/eventspost" component={EventsPost} />
              <Route exact path="/eventsput/:eventid" component={EventsPut} />
              <Route exact path="/eventsdelete/:eventid" component={EventsDelete} />
            </Switch>
          </section>
          <NaesteLob />
        </section>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
