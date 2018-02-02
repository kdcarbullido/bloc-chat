import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            messages: [],
            newMessage: ''
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.activeRoom = this.state.activeRoom;
        this.activeRoomId = this.state.activeRoomId
    };

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
//            console.log(snapshot, this.messagesRef);
//            this.setState({ rooms: this.state.messages.concat( snapshot.valueOf())});
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message )})
        });
    };


    handleChange(e) {
//        console.log('in handleChange', e.target.value)
        this.setState({ newMessage: e.target.value});
    };

    createMessage(e) {
//        console.log('in createRoom', this.state.newRoomName, this.state.rooms.length, this.roomsRef);
        e.preventDefault();
        if (!this.state.newMessage) {
            this.textInput.focus();
            return;
        };
        this.setState({newMessage: ''});
        this.textInput.focus();
    }

    newMessageCancel(e) {
//        console.log("in newRoomCancel");
        this.setState({newMessage: ''});
    }

    render () {
        console.log('this.state.messages: ', this.state.messages, 'this.props.activeRoomId: ', this.props.activeRoomId);

        return (
            <div>


                <table>
                    <tbody>
                    {
                        this.state.messages.filter( (msg, index) => msg.roomId === this.props.activeRoomId)
                        .map( (msg, index) =>
                        <tr className="messageRow" key={index}>
                        <td className="message">{msg.username}</td>
                        <td className="message">{msg.sentAt}</td>
                        <td className="message">{msg.content}</td>

                        </tr>
                        )
                    }
                    </tbody>
                </table>

                <form onSubmit={(e) => this.createMessage(e)}>
                    <input
                        type="text"
                        size="80"
                        placeholder=" Enter your message here . . ."
                        value={this.state.newMessage}
                        onChange={(e) => this.handleChange(e)}
                        ref={(input) => {this.textInput = input;} }
                        autoFocus
                    />
                    <input type="submit" className="submitButton" value="Send"/>
                    <button type="button" id='newMessageCancelButton' onClick={(e) => this.newMessageCancel(e)}>Cancel</button>
                </form>

            </div>
        )
//        console.log("in MessageList render function");
    }

}

export default MessageList;