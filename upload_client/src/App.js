import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
    </Router>
  );
}

export default App;
