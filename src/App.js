import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1IzAr5qOApzOTOEvMJnoGV9NJZdmDGHg",
    authDomain: "bloc-chat-a18df.firebaseapp.com",
    databaseURL: "https://bloc-chat-a18df.firebaseio.com",
    projectId: "bloc-chat-a18df",
    storageBucket: "bloc-chat-a18df.appspot.com",
    messagingSenderId: "325378015211"
};
firebase.initializeApp(config);




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
