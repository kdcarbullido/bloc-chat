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
//        console.log('in handleChange', e.target.value)
        this.setState({ newRoomName: e.target.value});
    };

    createRoom(e) {
//        console.log('in createRoom', this.state.newRoomName, this.state.rooms.length, this.roomsRef);
        e.preventDefault();
        if (!this.state.newRoomName) {
            return;
        };
        this.roomsRef.push({name: this.state.newRoomName});
        document.getElementById('newRoomEntry').value = '';
        this.setState({newRoomName: ''});
    }

    newRoomCancel(e) {
//        console.log("in newRoomCancel");
        let form = document.getElementById('newRoomForm').classList;
        form.add("formNoShow");
        document.getElementById('newRoomEntry').value = '';
        this.setState({newRoomName: ''});
    }

    newRoomButton () {
//        console.log("in newRoomButton");
        let form = document.getElementById('newRoomForm').classList;
        form.remove('formNoShow');
        document.getElementById('newRoomEntry').value = '';
        document.getElementById('newRoomEntry').focus();
    }


    render () {
//        console.log("in Roomlist render function");
        return (
            <div>
                <button type="button" id='newRoomButton' onClick={()=> this.newRoomButton()}>New Room</button>
                <form id='newRoomForm' className="formNoShow" onSubmit={ (e) => this.createRoom(e)}>
                    <input id='newRoomEntry' type="text" size="28" placeholder=" Enter new chat room name here . . ." value={ this.state.newRoomName}  onChange={ (e) => this.handleChange(e)} />
                    <input type="submit" className="submitButton" value="Create Room"/>
                    <button type="button" id='newRoomCancelButton' onClick={(e) => this.newRoomCancel(e)}>Cancel</button>
                </form>
                <table>
                    <tbody>
                    {
                        this.state.rooms.map( (room, index) =>
                            <tr className="roomRow" key={index}>
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