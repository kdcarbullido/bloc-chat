import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
            activeRoomId: '',
            displayName: "Guest",
            user: {},
            userId: null,
            signedIn: false
        }
    }

    handleRoomSelect (room) {
//        console.log('in handleRoomSelect', 'room:', room);
        if (!room) {
            this.setState({activeRoom: null, activeRoomId: null});
        } else {
            this.setState({activeRoom: room.name, activeRoomId: room.key});
        }
    }


    setUser (user) {
        if (user) {
//            console.log("in setUser uid/email/displayname", user.uid, user.email, user.displayName)
            this.setState({
                user: user,
                userId: user.uid,
                displayName: user.displayName,
                signedIn: true
            });
        } else {
            this.setState({
                user: {},
                userId: null,
                displayName: "Guest",
                signedIn: false
            })
        }
    }



  render() {
    return (
      <div className="App">
          <header>
              <User
                  firebase={firebase}
                  setUser={(user) => this.setUser(user)}
                  displayName={this.state.displayName}
                  signedIn={this.state.signedIn}
              />
          </header>
          <div id="wholePage">

            <div id="leftSide">
                <RoomList
                    firebase={firebase}
                    activeRoom={this.state.activeRoom}
                    handleRoomSelect={(room) => this.handleRoomSelect(room)}
                    signedIn={this.state.signedIn}
                    userId={this.state.userId}
                    displayName={this.state.displayName}
                />
            </div>
            {this.state.activeRoom &&
                <div id="rightSide">
                    <h2>{this.state.activeRoom}</h2>
                    <MessageList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        activeRoomId={this.state.activeRoomId}
                        displayName={this.state.displayName}
                    />
                </div>
            }
        </div>
      </div>
    )
  }
}

export default App;
