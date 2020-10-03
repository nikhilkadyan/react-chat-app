import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import './style.css';

const UpdateName = (props) => {
    const [input, setInput] = useState('');
    const onInput = (e) => setInput(e.target.value);

    const submitName = (e) => {
        let name = input;
        if (name.length === 0 || name === null || name === '' || name === undefined) {
            alert('Please enter a valid name');
        }else if(name === 'Admin'){
            alert(`Not available this is a reserved name`)
        } else {
            props.updatename(name + '-' + uuid().substr(0,4));
            props.closeModal();
        }
    }

    return (
        <div className="updateName-container" style={{ height: window.innerHeight, width: window.innerWidth }}>
            <div>
                <h1>Welcome</h1>
                <input type="text" onChange={onInput} value={input} placeholder="Enter your name" />
                <button onClick={submitName}>Save</button>
            </div>
        </div>
    )
}

export default UpdateName
