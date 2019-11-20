import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";
import Cookie from "js-cookie";

import Offers from "./components/Offers";
import Offer from "./components/Offer";
import Publish from "./components/Publish";

import Header from "./containers/Header";
import Footer from "./containers/Footer";
import SignUp from "./components/SignUp";

function App() {
  const token = Cookie.get("token");
  const [user, setUser] = useState({ token: token });
  const [showModal, setShowModal] = useState(false);
  return (
    <Router>
      <Header
        setUser={setUser}
        user={user}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Switch>
        <Route exact={true} path="/">
          <Redirect to="/Offers" />
        </Route>
        <Route path="/Offers">
          <Offers />
        </Route>
        <Route path="/Offer/:id">
          <Offer />
        </Route>
        <Route path="/SignUp">
          <SignUp setUser={setUser} user={user} />
        </Route>
        <Route path="/publish">
          <Publish token={user.token} setShowModal={setShowModal} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
