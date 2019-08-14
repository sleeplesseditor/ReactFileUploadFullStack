import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
          <Route exact path="/" />
        </Switch>
    </Router>
  );
}

export default App;
