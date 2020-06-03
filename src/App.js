import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';


import Search from './components/forecast/Search';
import Wardrobe from './components/forecast/Wardrobe'

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
var session = driver.session()

const getSession = () => {
  app.get('/', function (req, res){
    session
      .run('MATCH(n:Footwear) RETURN n LIMIT 10')
      .then(function(result){
        result.records.forEach(function(record){
            console.log(record);
          });
      })
      .catch(function(err){
            console.log(err)
      });
    res.send('It works');
  });
}

app.listen(3000);
console.log('server started on port 3000');

module.exports = app;

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
              <button onClick={() => getSession()}>Lets make sure Neo4j works</button>
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
