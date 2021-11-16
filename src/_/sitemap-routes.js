import React from 'react';
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';

export default (
  <Routes>
    <Switch>
      <Route path="/" />
      <Route path="/about" />
      <Route path="/team" />
    </Switch>
  </Routes>
);
