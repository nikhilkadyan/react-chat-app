import React, { useState, useRef, useEffect } from 'react';
import UpdateName from '../../components/UpdateName';
import MessageBox from '../../components/MessageBox';
import io from "socket.io-client";
import './style.css';

let SOCKET_SERVER = "https://learnage-server.precisely.co.in:4000/chat";

const Room = (props) => {
    const roomID = props.match.params.roomID;
    const [name, setName] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [msgInput, setMsgInput] = useState('');
    const [modal, setModal] = useState(false);
    const socketRef = useRef();

    useEffect(() => {
        if (name === null) {
            setModal(true)
        }
    }, [name])

    useEffect(() => {
        if (name !== null) {
            socketRef.current = io.connect(SOCKET_SERVER);
            socketRef.current.emit('join-room', { roomID: roomID, data: { name: name } });

            socketRef.current.on('new-user', (payload) => {
                console.log(payload.data.name + ' has joined')
            })

            socketRef.current.on('room-joined', (payload) => {
                setUsers(payload.users);
                setMessages(payload.messages);
                localStorage.setItem('socket', socketRef.current.id);
                socketRef.current.emit("message", {
                    roomID: roomID,
                    data: {
                        id: localStorage.getItem('socket'),
                        sender: name,
                        type: 'join',
                        content: name + ' joined.',
                        time: new Date().toLocaleTimeString()
                    }
                })
            })

            socketRef.current.on('got-message', (payload) => {
                setMessages((prev) => {
                    return [...prev, payload.data]
                })
            })

            socketRef.current.on('user-left', (payload) => {
                console.log(payload.data.name + ' has left')
                console.log(users)
            })
        }
        // eslint-disable-next-line
    }, [name, roomID])

    const closeModal = () => setModal(false)
    const updatename = (name) => setName(name)
    const msgInputChange = (e) => setMsgInput(e.target.value)
    const msgInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(msgInput !== ''){
                sendMessage()
            }
            document.activeElement.blur();
          }
    }
    const sendMessage = () => {
        socketRef.current.emit("message", {
            roomID: roomID,
            data: {
                id: localStorage.getItem('socket'),
                sender: name,
                content: msgInput,
                type: 'message',
                time: new Date().toLocaleTimeString()
            }
        })
        setMsgInput('');
    }

    return (
        <>
            {modal && <UpdateName closeModal={closeModal} updatename={updatename} />}
            <div className="room-container">
                <div style={{ width: `100%`, maxWidth: `700px` }}>
                    <MessageBox messages={messages} />
                    <div className="send-message">
                        <input type="text" onChange={msgInputChange} value={msgInput} onKeyDown={msgInputKeyDown} placeholder="Message"/>
                        {/* <button onClick={sendMessage}>Send Message</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room
