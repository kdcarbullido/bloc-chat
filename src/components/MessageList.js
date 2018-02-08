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
        this.messagesRef.push({
           content: this.state.newMessage,
           roomId: this.props.activeRoomId,
           sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
           username: this.props.displayName
        });
        this.setState({newMessage: ''});
        this.textInput.focus();
    }

    newMessageCancel(e) {
//        console.log("in newRoomCancel");
        this.setState({newMessage: ''});
    }

    setMsgRowClass (index) {
          if ((index % 2 ) === 0) {
            return "messageRow shaded"
          } else {
            return "messageRow"
          }
    }

    deleteMessage (msgToDelete) {
        console.log ("in deleteMessage msg=", msgToDelete);
        alert ("Deleting this message");
//  delete from firebase database
        this.props.firebase.database().ref('messages/' + msgToDelete.key).remove();
//  filter from messages array and let react redraw
        let newMessages = this.state.messages.filter( (msg) =>  msg.content !== msgToDelete.content);
        this.setState ({
            messages: newMessages
        });
    }



    render () {
        return (
            <div>
                    {
                        this.state.messages.filter( (msg, index) => msg.roomId === this.props.activeRoomId)
                        .map( (msg, index) =>
                            <div key={index}>
                                <div className={this.setMsgRowClass(index)}>
                                    <div className="msgLine1">
                                        <div className="userName">{msg.username}</div>
                                        <div className="timeStamp">{new Date(msg.sentAt).toLocaleString()}</div>
                                    </div>
                                    <div className="content">{msg.content}
                                        {(msg.username === this.props.displayName) &&
                                        <button type="button" className='deleteMsgButton'
                                                onClick={(e) => this.deleteMessage(msg)}>Delete This Message</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }

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
    }

}

export default MessageList;