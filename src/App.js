import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'

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
    constructor (props) {
        super (props);
        this.state = {
            activeRoom: '',
            activeRoomId: ''
        }
    }

    handleRoomSelect (room) {
//        console.log('in handleRoomSelect', 'room:', room);
        this.setState({activeRoom:room.name, activeRoomId:room.key});
    }


  render() {
    return (
      <div className="App">
        <div id="wholePage">
            <div id="leftSide">
                <h1>Bloc Chat</h1>
                <RoomList
                    firebase={firebase}
                    activeRoom={this.state.activeRoom}
                    handleRoomSelect={(room) => this.handleRoomSelect(room)}
                />
            </div>
            {this.state.activeRoom &&
                <div id="rightSide">
                    <h2>{this.state.activeRoom}</h2>
                    <MessageList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        activeRoomId={this.state.activeRoomId}
                    />
                </div>
            }
        </div>
      </div>
    )
  }
}

export default App;
