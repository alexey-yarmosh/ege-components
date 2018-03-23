import React, { Component } from 'react';

// import Graph from './graph';
import SoundRecord from './sound-record';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <Graph /> */}
        <SoundRecord />
      </div>
    );
  }
}

export default App;
