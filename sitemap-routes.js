import React from 'react';
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';

export default (
  <Routes>
    <Switch>
      <Route path="/" />
      <Route path="/about" />
      <Route path="/my-account" />
      <Route path="/team" />
      <Route path="/:artist" />
      <Route path="/:artist/:auction" />
    </Switch>
  </Routes>
);
