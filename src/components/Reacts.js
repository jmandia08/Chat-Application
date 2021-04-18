const Reacts = ({setReact=null,docId="",reactors="",documentID="",reaction="",reactor=""}) => {

    return (
        <>
        {reaction ? 
        <div className="reactions react-love" id={documentID}>
            {reaction}
        </div> 
        :
        <>
            <div onClick={() => {setReact("❤️",docId,reactors)}} className="reactions react-love">❤️</div>
            <div onClick={() => {setReact("😆",docId,reactors)}} className="reactions react-haha">😆</div>
            <div onClick={() => {setReact("😮",docId,reactors)}} className="reactions react-wow">😮</div>
            <div onClick={() => {setReact("😢",docId,reactors)}} className="reactions react-sad">😢</div>
            <div onClick={() => {setReact("😠",docId,reactors)}} className="reactions react-mad">😠</div>
            <div onClick={() => {setReact("👍",docId,reactors)}} className="reactions react-like">👍</div>
            <div onClick={() => {setReact("👎",docId,reactors)}} className="reactions react-dislike">👎</div>
        </>
        }
        </>
    )
}

export default Reacts
