import React,{useState,useEffect} from 'react'
import firebase from 'firebase/app'
import Message from './Message'

const Channel = ( {user = null, db = null,userID=null }) => {
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState([]);
    const {uid,displayName,photoURL} =user;

    useEffect(() =>{
        if(db){
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot =>{
                
                const data = querySnapshot.docs.map(doc =>({
                    ...doc.data(),
                    id:doc.id,
                }));
                setMessages(data);
            })

            return unsubscribe;
        }
    },[db]);

    const handleOnChange = e =>{
        setNewMessage(e.target.value);
    }
    const handleOnSubmit = e =>{
        e.preventDefault();

        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
            })
        }
        setNewMessage('');
    }
    return (
        <ul>
            <div className="messageContainer">
            <div className="start">
                <h3>Welcome to the chat!</h3>
            </div>
            {messages.map(message => (
                <li key={message.id}>
                <Message {...message} messageID={message.uid} userId={userID}></Message>    
                </li>
            ))}
            </div>
        <form onSubmit={handleOnSubmit}>
            <input
                className="txtMessage"
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here ..."
            />
            <button className="btnSend" type="submit" disabled={!newMessage}>
                Send
            </button>
        </form>
        </ul>
    );
};

export default Channel
