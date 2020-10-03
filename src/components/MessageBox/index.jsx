import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const MessageBox = ({ messages }) => {
    const curr = localStorage.getItem('socket');
    React.useEffect(() => {

    },[messages])
    return (
        <div style={{height: `${window.innerHeight} px` }}>
            <Link to="/" className="exit">Leave</Link>
            <div className="messagebox-container">
            {messages && messages.map((message, key) => {
                return (
                    <div key={key}>
                        {message.type === 'join' &&
                            <p className="content" style={{ color: `green`, textAlign: `center` }}>{message.content}</p>
                        }
                        {message.type === 'left' &&
                            <p className="content"  style={{ color: `red`, textAlign: `center` }}>{message.content}</p>
                        }
                        {message.type === 'message' &&
                            <div className={curr === message.id ? 'message message-sent':'message message-recieved'}>
                                <p className="content" >{message.content}</p>
                                <small>{curr === message.id ? "You" : message.sender}, {message.time}</small>
                            </div>
                        }

                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MessageBox
