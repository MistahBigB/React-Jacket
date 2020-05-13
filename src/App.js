import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';


import Search from './components/forecast/Search';
import Wardrobe from './components/forecast/Wardrobe'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <Route exact={true} path='/' render={() => (
            <>
              <h1>Welcome to...</h1>
              <Search />
              <Link to='/wardrobe/'>Wardrobe</Link>
            </>
          )}/>
          <Route path='/wardrobe' render={() => (
            <>
              <Wardrobe />
            </>
          )}/>
        </header>
      </div>
      </Router>
    );
  }
}

export default App;
