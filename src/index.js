import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './assets/main.css';
// Pages
import Home from './pages/Home';
import Room from './pages/Room';

const App = () => {
  localStorage.setItem('height', window.innerHeight);
  localStorage.setItem('width', window.innerWidth);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
