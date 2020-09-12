import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
    const [randString, setRandString] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id) {
            db.collection('users').doc(id).collection('messages').orderBy('timestamp', 'desc').
            onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [id])

    useEffect(() => {
        setRandString(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const userName = prompt("Enter name for room");

        if (userName) {
            db.collection('users').add({
                name: userName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/users/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${randString}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Create a new group</h2>
        </div>
    )
}

export default SidebarChat
