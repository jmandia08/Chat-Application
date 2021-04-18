import React,{useState} from 'react';
import {formatRelative} from 'date-fns';
import Reacts from './Reacts'

const Message = ({
    db=null,
    id='',
    reacts='',
    createdAt = null,
    type='',
    text ='',
    displayName ='',
    photoURL ='',
    userId='',messageID='',show=false
}) => {
    const [showReacts,setShowReacts] = useState(show);
    const toggleReact = () => {
        setShowReacts(true);
    }

    const addReact = (reactions,id) => {
        db.collection("messages").doc(`${id}`).update({
            reacts:reactions
        })
        setShowReacts(false);
    }
    return (
    <>
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
                { showReacts === true ?
                    <Reacts setReact={addReact} docId={id}/>
                    :
                    <div onClick={toggleReact}>{reacts ?  reacts :"+😀" }</div>
                }
            </div> 
            </div>
        </div>
    </>
    )
}
export default Message
