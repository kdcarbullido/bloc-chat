import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    signInButtonClick(e) {
        console.log("In signInButtonClick");
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            // var user = result.user;
            console.log("Successful sign in");
  //          this.props.setUser (user);
        }).catch(function(error) {
            alert("Sign-in error");
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log  (errorCode, errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }

    signOutButtonClick(e) {
        console.log("In signOutButtonClick");
        this.props.firebase.auth().signOut().then(function() {
            alert("User signed out.");
        }).catch(function(error) {
            alert("User signout error.")
        });
        this.props.setUser(null);
    }


    render() {
//        console.log("in User render function");
        return (
            <div id="header">
                <h1 id="title">Bloc Chat</h1>
                <div>
                    <span id="signOnDisplayName">{this.props.displayName}</span>
                    {!this.props.signedIn ?
                        <button type="button" id='signInButton' onClick=
                            {(e) => this.signInButtonClick(e)}>Sign In</button>
                        :
                        <button type="button" id='signOutButton' onClick=
                            {(e) => this.signOutButtonClick(e)}>Sign Out</button>
                    }
                </div>
            </div>
        )
    }

}

export default User;