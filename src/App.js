import React,{useState,useEffect} from 'react'
//firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//components
import Button from './components/Button'
import Channel from './components/Channel'

firebase.initializeApp({
    apiKey: "AIzaSyAgefQ7HHumgdKjlspOAXFB_2xzstazyLw",
    authDomain: "chat-application-64376.firebaseapp.com",
    projectId: "chat-application-64376",
    storageBucket: "chat-application-64376.appspot.com",
    messagingSenderId: "218494531733",
    appId: "1:218494531733:web:fd34858f77fce35c25c39c"
});

const auth = firebase.auth();
const db = firebase.firestore();
function App() {
  const [user,setUser] = useState(()=> auth.currentUser);
  const [initializing,setInitializing] = useState(true);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });

    return unsubscribe;
  },[])

  const signInWithGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(googleProvider);
    }catch(error){
      console.log(error);
    }
  };
  const signInWithTwitter= async () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(twitterProvider);
    }catch(error){
      console.log(error);
    }
  };

const signOut = async () =>{
  try{
    await firebase.auth().signOut();
  }catch(error){
    console.log(error);
  }
}

// if(initializing) return "Loading . . .";

// // disable right click
// document.addEventListener('contextmenu', event => event.preventDefault());
 
// document.onkeydown = function (e) {

//     // disable F12 key
//     if(e.keyCode === 123) {
//         return false;
//     }

//     // disable I key
//     if(e.ctrlKey && e.shiftKey && e.keyCode === 73){
//         return false;
//     }

//     // disable J key
//     if(e.ctrlKey && e.shiftKey && e.keyCode === 74) {
//         return false;
//     }

//     // disable U key
//     if(e.ctrlKey && e.keyCode === 85) {
//         return false;
//     }
// }

  return (
    <html>
          {user ? (
            <>
              <div className="Main-Container">
                <div className="container-left cont">
                  <div className="user">
                    <img className="user-icon head"src={user.photoURL} alt="Avatar" width={45} height={45}/>
                    <div className="greeting head">{user.displayName}</div>
                    <div className="signout head"><Button onClick={signOut}>Sign Out</Button></div>
                  </div>
                </div>
          
                <div className="container-center cont">
                    <div className="chat-header">
                      <img className="chat-head chat-info"src={user.photoURL} alt="Avatar" width={45} height={45}/>
                      <div className="chat-info">
                          <div className="chat-name">
                            {user.displayName}
                           </div>
                           <div className="chat-status"> 
                            <div className="current-status status">•</div>
                            <div className="text-status status">Active Now</div>
                          </div>
                      </div>
                    </div>
                    <div className="body"><Channel user={user} userID={user.uid} db={db}></Channel></div>
                </div>

                <div className="container-right cont">
                  <div className="announcement">
                      <marquee> More Features to come!</marquee>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="login-page">
              <div className="login-child">
                <div className="welcome"> <div className="text404">404:Chat App</div></div>
                <Button onClick={signInWithGoogle} loginType="google">Sign in with google</Button>
                <br/>
                <Button onClick={signInWithTwitter} loginType= "twitter">Sign in with Twitter</Button>
              </div>
            </div>
          )}
    </html>
  );
}

export default App;
