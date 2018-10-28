import React, { Component } from 'react'
//import { Route } from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeContainer from './layouts/home/HomeContainer'
import OuterRequest from './layouts/requestComponents/makeRequest/OuterRequest'


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
//import './App.css'
import './index.css'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={HomeContainer}/>
        <Route path="/request/" component={OuterRequest}/>
      </div>
      </Router>
    );
  }
}

export default App
