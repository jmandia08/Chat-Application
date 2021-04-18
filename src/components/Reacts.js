const Reacts = ({setReact=null,docId=""}) => {

    return (
        <>
            <div onClick={() => {setReact("❤️",docId)}} className="reactions react-love">❤️</div>
            <div onClick={() => {setReact("😆",docId)}} className="reactions react-haha">😆</div>
            <div onClick={() => {setReact("😮",docId)}} className="reactions react-wow">😮</div>
            <div onClick={() => {setReact("😢",docId)}} className="reactions react-sad">😢</div>
            <div onClick={() => {setReact("😠",docId)}} className="reactions react-mad">😠</div>
            <div onClick={() => {setReact("👍",docId)}} className="reactions react-like">👍</div>
            <div onClick={() => {setReact("👎",docId)}} className="reactions react-dislike">👎</div>
        </>
    )
}

export default Reacts
