import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';

// <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
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
        <div id="wholePage">
            <div id="leftSide">
                <h1>Bloc Chat</h1>
                <RoomList
                    firebase={firebase}
                />
            </div>
            <div id="rightSide">
            </div>
        </div>
      </div>
    )
  }
}

export default App;
