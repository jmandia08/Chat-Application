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

if(initializing) return "Loading . . .";

  return (
    <div className="container">
      {user ? (
        <>
          <div className="header">
          <div className="login head"><Button onClick={signOut}>Sign Out</Button></div>
          <div className="greeting head">Hello {user.displayName}</div>
          </div>
          <div className="body"><Channel user={user} userID={user.uid} db={db}></Channel></div>
        </>
      ) : (
        <>
        <Button onClick={signInWithGoogle} loginType="google">Sign in with google</Button>
        <Button onClick={signInWithTwitter} loginType= "twitter">Sign in with Twitter</Button>
        <div className="welcome"> <div className="text404">404:Chat App</div></div>
        </>
      )}
    </div>
  );
}

export default App;
