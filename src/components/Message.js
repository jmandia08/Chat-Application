import React from 'react';
import {formatRelative} from 'date-fns';

const Message = ({
    createdAt = null,
    text ='',
    displayName ='',
    photoURL ='',
    userId='',messageID=''
}) => {
    return (
        <div className="main">
            <div className={userId === messageID ? "hdr-orange": "hdr-blue"}>
            {
                photoURL ? (
                    <img className={userId === messageID ? "icon-orange image messageHead": "icon-blue image messageHead"} src={photoURL} alt="Avatar" width={45} height={45}/>
                ): null}
                {displayName ? <p className="sender messageHead">{displayName}</p> : null}<br/>
            </div>
            <div className={userId === messageID ? "message-orange": "message-blue"}>
                <p className="message-content">{text}</p><br/>
                <div className="message-timestamp-left">{createdAt ?.seconds? (
                    <span className="sender">
                        {formatRelative(
                            new Date(createdAt.seconds*1000), new Date()
                        )}
                    </span>
                ) : null}</div>
            </div>
        </div>
    )
}
export default Message
