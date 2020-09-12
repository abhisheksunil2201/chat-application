import React, {useState, useEffect} from 'react';
import './Chat.css';
import { Avatar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {

    const [input, setInput] = useState('');
    const [randString, setRandString] = useState('');
    const {userId} = useParams();
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(userId) {
            db.collection('users').doc(userId).onSnapshot(snapshot => (
                setUserName(snapshot.data().name)
            ))

            db.collection('users').doc(userId).collection('messages').orderBy('timestamp', "asc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [userId])

    useEffect(() => {
        setRandString(Math.floor(Math.random() * 5000))
    }, [userId])

    const sendMessage = (event) => {
        event.preventDefault();

        db.collection('users').doc(userId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${randString}.svg`}/>
                
                <div className="chat__headerInfo">
                    <h3>{userName}</h3>
                </div>

            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}

                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        placeholder="Type a message" 
                        type="text" 
                    />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
