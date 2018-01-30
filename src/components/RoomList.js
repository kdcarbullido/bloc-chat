import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            rooms: [],
            newRoomName: ''
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    };

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
//            console.log(snapshot, this.roomsRef);
//            this.setState({ rooms: this.state.rooms.concat( snapshot.valueOf())});
            const room = snapshot.val();
            room.key = snapshot.key;
//            console.log(room.key, room.name);
            this.setState({ rooms: this.state.rooms.concat( room )})
        });
    };


    handleChange(e) {
        console.log('in handleChange', e.target.value)
        this.setState({ newRoomName: e.target.value});
    };

    createRoom(e) {
        console.log('in createRoom', this.state.newRoomName, this.state.rooms.length, this.roomsRef);
        e.preventDefault();
        if (!this.state.newRoomName) { return };
        let nextRoomKey = (this.state.rooms.length + 1).toString();
        console.log(nextRoomKey);
        this.roomsRef.push( {nextRoomKey, name: this.state.newRoomName}
        );
    };



    render () {
//        console.log("in Roomlist render function");
        return (
            <div>
                <button type="button" id='newRoomButton'>New Room</button>
                <form id='newRoomForm' onSubmit={ (e) => this.createRoom(e)}>
                    <input type="text" size="28" placeholder=" Enter new chat room name here . . ." value={ this.state.newRoomName}  onChange={ (e) => this.handleChange(e)} />
                    <input type="submit" />
                </form>
                <table>
                    <tbody>
                    {
                        this.state.rooms.map( (room, index) =>
                            <tr className="roomRow" key={index}>
                                <td className="roomNumber">Room #{room.key}</td>
                                <td className="roomName">{room.name}</td>
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