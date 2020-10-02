import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './style.css'
const Home = () => {
    const randomId = uuid();

    return (
        <div className="homeContainer" style={{ height: window.innerHeight, width: window.innerWidth }}>
            <div>
                <h1>React Group Chat</h1>
                <p>
                    By Nikhil Kadyan
                    <Link to={`/room/${randomId}`}>Join Room</Link>
                </p>
            </div>
        </div>
    )
}

export default Home
