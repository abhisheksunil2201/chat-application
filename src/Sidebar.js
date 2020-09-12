import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {Avatar} from '@material-ui/core'
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {
    const [users, setUsers] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })
                ))
        ))

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                {console.log(user)}
                <Avatar src={user?.photoURL} />
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search..." type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {users.map((user) => (
                    <SidebarChat key={user.id} id={user.id} name={user.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
