import React,{useState,useEffect} from 'react';
import {formatRelative} from 'date-fns';
import Reacts from './Reacts'
import firebase from 'firebase/app'

const Message = ({
    db=null,
    id='',
    reacts='',
    createdAt = null,
    type='',
    text ='',
    displayName ='',
    photoURL ='',
    userId='',messageID=''
}) => {
    const [showReacts,setShowReacts] = useState(false);
    const [reactions,setReactions] = useState([]);

    useEffect(() => {
        db.collection("reactions").where("documentID", "==", id)
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc =>({
                ...doc.data(),
            }));
        setReactions(data);
        })
      });

    const toggleReact = () => {
        setShowReacts(!showReacts);
    }

    const addReact = (reactions,id,reactor) => {
        // db.collection("messages").doc(`${id}`).update({
        //     reacts:reactions
        // })

        db.collection('reactions').add({
            documentID:id,
            reaction:reactions,
            reactor:reactor,
            reactTime:firebase.firestore.FieldValue.serverTimestamp()
        })
        
        toggleReact();
    }

    // useEffect(() =>{
    //     if(db){
    //         const getReacts = db
    //             .collection('reactions')
    //             .orderBy('reactTime')
    //             .onSnapshot(querySnapshot =>{
    //             const data = querySnapshot.docs.map(doc =>({
    //                 ...doc.data(),
    //                 id:doc.id,
    //             }));
    //             setReactions(data);
    //         })

    //         return getReacts;
    //     }
    // },[db]);
    return (
        <div className="main" id={id.toString()}>
            <div className={userId === messageID ? "hdr-orange": "hdr-blue"}>
            {
                photoURL ? (
                    <img className={userId === messageID ? "icon-orange image messageHead": "icon-blue image messageHead"} src={photoURL} alt="Avatar" width={45} height={45}/>
                ): null}
                {displayName ? <p className="sender messageHead">{displayName}</p> : null}<br/>
            </div>
            <div className={userId === messageID ? "message-orange": "message-blue"}>
                { type ==="text"?
                (<p className={userId === messageID ? "message-right": "message-left"}>{text}</p>):
                    <div><img className="memes" alt="memes" src={text}></img></div>
                }<br/>
                <div className={userId === messageID ? "message-timestamp-right": "message-timestamp-left"}>{createdAt?.seconds? (
                    <span className="sender">
                        {formatRelative(
                            new Date(createdAt.seconds*1000), new Date()
                        )}
                    </span>
                ) : null}</div>
                
            <div className="reacts">
                <div onClick={toggleReact}>
                    { showReacts === true ?
                        <Reacts setReact={addReact} docId={id} reactors={userId}/>
                        :
                        <div>{
                            reactions.length > 0 ?
                            reactions.map(reaction => (
                                <Reacts key={Math.random()} {...reaction} ></Reacts>   
                            ))
                            :<Reacts reaction="+😀"/> }
                        </div>
                    }
                </div>
            </div> 
            </div>
        </div>
    )
}
export default Message
