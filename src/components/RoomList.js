import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            rooms: []
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

    render () {
//        console.log("in Roomlist render function");
        return (
            <div>
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