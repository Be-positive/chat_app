import React, {useRef, useState} from 'react'
import { auth } from '../../../firebase/config';
import ChatMessage from '../chatMessage/ChatMessage';

// connection with Firebase db
import { firestore } from '../../../firebase/config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

// style
import "./center.css"

function CenterChat() {

  const usersRef = firestore.collection('rooms');
  const [rooms] = useCollectionData(usersRef, { idField: 'id' }); 

  if(rooms){
    var room = rooms[0].roomNumber
    var room2 = room.slice(5,10) + room.slice(0, 5)
  }
  
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  
  const query = messagesRef
  .orderBy('createdAt')
  .limit(50);
  // quantity of max messages (if > 50 u can't see this messages)

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      room
    })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  // it's not workin'!
  const handleDelete = (createdAt, id) => {
    firestore.collection("messages").doc(id).delete();
  };

  return (<>
    <main className="messages">
      
      {messages && messages.map(function(msg) { if( msg.room === room || msg.room === room2){ return <ChatMessage 
      key={msg.id} 
      message={msg} 
      handleDelete={handleDelete}      
      />}})}      
      {/* creating a props of ChatMessage, which using inside ChatMessage component */}

      <span ref={dummy}></span>

    </main>

    <form className="messagesForm" onSubmit={sendMessage}>

      <input size="30" className="messagesInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message here..." />

      <button className="messagesButton" type="submit" disabled={!formValue}>🕊️</button>     
      
    </form>
  </>)
}

export default CenterChat


