import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const MessageBox = ({ messages }) => {
    const curr = localStorage.getItem('socket');
    return (
        <div className="messagebox-container">
            Messages <Link to="/" className="exit">X</Link>
            <hr />
            {messages && messages.map((message, key) => {
                return (
                    <div key={key}>
                        {message.type === 'join' &&
                            <h2 style={{ color: `green`, textAlign: `center` }}>{message.content}</h2>
                        }
                        {message.type === 'left' &&
                            <h2 style={{ color: `red`, textAlign: `center` }}>{message.content}</h2>
                        }
                        {message.type === 'message' &&
                            <div className={curr === message.id ? 'message message-sent':'message message-recieved'}>
                                <h2>{message.content}</h2>
                                <small>{curr === message.id ? "You" : message.sender}, {message.time}</small>
                            </div>
                        }

                    </div>
                )
            })}
        </div>
    )
}

export default MessageBox
