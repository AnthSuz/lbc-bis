import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

import Offers from "./components/Offers";
import Offer from "./components/Offer";

import Header from "./containers/Header";
import Footer from "./containers/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact="true" path="/">
          <Redirect to="/Offers" />
        </Route>
        <Route path="/Offers">
          <Offers />
        </Route>
        <Route path="/Offer/:id">
          <Offer />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
