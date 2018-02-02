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
        this.activeRoom = this.props.activeRoom;
        console.log(this.props.activeRoom)
    };

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            console.log('snapshot: ', snapshot, 'this.roomsRef: ', this.roomsRef);
//            this.setState({ rooms: this.state.rooms.concat( snapshot.valueOf())});
            const room = snapshot.val();
            room.key = snapshot.key;
            console.log('room: ', room, 'room.key: ', room.key)
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
//        console.log(this.state.rooms);
        if (this.state.rooms.filter(room => room.name === this.state.newRoomName).length === 0) {
            this.roomsRef.push({name: this.state.newRoomName});
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
                forVisible: false,
                newRoomName: ''
            }
        )
    }

    newRoomButton (e) {
//        console.log("in newRoomButton");
        this.setState({formVisible : true});
    }


    styleRoomRow (roomx) {
//        console.log('room.name', roomx, 'activeRoom', this.props.activeRoom);
        if (roomx === this.props.activeRoom) return "roomRow selected";
        return "roomRow";
    }


    render () {
//        console.log("in Roomlist render function");
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

                <table>
                    <tbody>
                    {
                        this.state.rooms.map( (room, index) =>
                            <tr className={this.styleRoomRow(room.name)} key={index}  onClick={(e) => this.props.handleRoomSelect(e)}>
                                <td className="roomName">{room.name}</td>
                                <td>{room.key}</td>

                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default RoomList;