import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            rooms: [],
            newRoomName: '',
            formVisible: false
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
//        this.activeRoom = this.props.activeRoom;
//        console.log(this.props.activeRoom)
    };

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
//            console.log('snapshot: ', snapshot, 'this.roomsRef: ', this.roomsRef);
//            this.setState({ rooms: this.state.rooms.concat( snapshot.valueOf())});
            const room = snapshot.val();
            room.key = snapshot.key;
//            console.log('room: ', room, 'room.key: ', room.key)
            this.setState({ rooms: this.state.rooms.concat( room )})
        });
    };

    handleChange(e) {
//        console.log('in handleChange', e.target.value)
        this.setState({ newRoomName: e.target.value});
    };

    createRoom(e) {
//        console.log('in createRoom', this.state.newRoomName, this.state.rooms.length, this.roomsRef);
        e.preventDefault();
        if (!this.state.newRoomName) {
            this.textInput.focus();
            return;
        };

        if (!this.props.signedIn) {
            alert ("Must sign in to create a room.")
            this.newRoomCancel();
            return;
        };

        console.log("in createRoom", this.props.userId, this.props.displayName);
        if (this.state.rooms.filter(room => room.name === this.state.newRoomName).length === 0) {
            this.roomsRef.push({
                name: this.state.newRoomName,
                creatorId: this.props.userId,
                creatorUserName: this.props.displayName
            });
        } else {
            alert("A chatroom with this name already exists");
        }
        this.setState(
            {
                newRoomName: '',
                formVisible: true
            }
        );
        this.textInput.focus();
    }

    newRoomCancel(e) {
//        console.log("in newRoomCancel");
        this.setState(
            {
                formVisible: false,
                newRoomName: ''
            }
        )
    }

    newRoomButton (e) {
//        console.log("in newRoomButton");
        if (!this.props.signedIn) {
            alert ("Must be signed in to create new chat rooms");
        } else {
            this.setState({formVisible: true});
        }
    }


    styleRoomName (roomx) {
//        console.log('room.name', roomx, 'activeRoom', this.props.activeRoom);
        if (roomx === this.props.activeRoom) return "roomName selected";
        return "roomName";
    }

    deleteRoom (roomToDelete) {
        console.log("in deleteRoom roomToDelete", roomToDelete, roomToDelete.name);
//  delete from firebase database
        this.props.firebase.database().ref('rooms/' + roomToDelete.key).remove();
//  filter from room array and let react redraw
        let newRooms = this.state.rooms.filter( (room) =>  room.name !== roomToDelete.name);
        this.setState ({
            rooms: newRooms
        });
//        this.props.handleRoomSelect(null);  // ideally, should remove display of messages , and delete messages for this room/  research tells me that I should implement Flux or similar to since this is not a parent-child relationship between room and messages components

        //  have not deleted the message that were created in this room, from firebase messages yet.


    }

    render () {
        return (
            <div>
                <button type="button" id='newRoomButton' onClick={(e)=> this.newRoomButton(e)}>New Room</button>
                {this.state.formVisible &&
                <form onSubmit={(e) => this.createRoom(e)}>
                    <input
                        type="text"
                        size="28"
                        placeholder=" Enter new chat room name here . . ."
                        value={this.state.newRoomName}
                        onChange={(e) => this.handleChange(e)}
                        ref={(input) => {this.textInput = input;} }
                        autoFocus
                    />
                    <input type="submit" className="submitButton" value="Create Room"/>
                    <button type="button" id='newRoomCancelButton' onClick={(e) => this.newRoomCancel(e)}>Cancel</button>
                </form>
                }

                <div>
                    <div>
                    {
                        this.state.rooms.map( (room, index) =>
                            <div key={index}>
                                <div className="roomRow">
                                    <div className={this.styleRoomName(room.name)}
                                         onClick={(e) => this.props.handleRoomSelect(room)}>
                                        {room.name}
                                    </div>
                                    {(room.creatorId === this.props.userId) &&
                                     <button type="button" className='deleteRoomButton' onClick={(e) => this.deleteRoom(room)}>Delete Room</button>
                                    }
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        )
//        console.log("in Roomlist render function");
    }

}

export default RoomList;