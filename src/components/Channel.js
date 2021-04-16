import React,{useState,useEffect,useRef} from 'react'
import firebase from 'firebase/app'
import Message from './Message'

const Channel = ( {user = null, db = null,userID=null,storage=null }) => {
    const [image,setImage] = useState(null);
    const [imgURL,setURL] = useState("");
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState([]);
    const {uid,displayName,photoURL} =user;
    const messagesEndRef = useRef(null)


    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [messages]);


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
                
                setNewMessage('');
            })

            return unsubscribe;
        }
    },[db]);

    const handleOnChange = e =>{
        setNewMessage(e.target.value);
    }

    const handleOnSubmit = e =>{
        e.preventDefault();
        if(newMessage){
            if(db){
                db.collection('messages').add({
                    type:"text",
                    text: newMessage,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid,
                    displayName,
                    photoURL,
                })
            }
            setNewMessage('');
            scrollToBottom();
        }
        
    }
    const uploadImg = e => {
        if(image){
        e.preventDefault();
            const uploadImg = storage.ref(`images/${image.name}`).put(image);
            uploadImg.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('messages').add({
                            type:"image",
                            text: url,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            uid,
                            displayName,
                            photoURL,
                        })
                     });
                }
            )
            e.currentTarget.blur()
            setURL("");
            setImage(null);
        }
    }
    const handleChange = e =>  {
        if(!imgURL){
            e.preventDefault();
            if(e.target.files[0]){
                setImage(e.target.files[0]);
                setURL(URL.createObjectURL(e.target.files[0]))
            }
        }
    }
    const clearImage = () => {
        setURL("");
        setImage(null);
    }
    return (
        <>
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
                
                <div ref={messagesEndRef} />
            </div>
        </ul>
        <div className="inputContainer"> 
            <div className="imageContainer"> 
                {imgURL ? (
                     <div >
                        <img className="imagePreview preview-items" alt="meme" src={imgURL}/> 
                        <div className="deleteImage preview-items" onClick={clearImage}>x</div>
                    </div>
                     ) : null}
            </div>
            <form onSubmit={handleOnSubmit} className="form">
                <div className="inputBg inputImage inp">
                    <input className="inputUpload" type="file" onClick={e => (e.target.value = null)} accept="image/png, image/jpeg" onChange={handleChange}/>
                </div>
                <div className="inp inputText">
                    <input
                        className="txtMessage inp"
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Type your message here ..."
                    />
                </div>
                 <div className="inp inputButton">
                    <button className="btnSend" type="submit" onClick={uploadImg} disabled={!newMessage?!imgURL:!newMessage}>
                        Send
                    </button>
                </div>
            </form>
            </div>
        </>
    );
};

export default Channel
