import React, {useState} from "react";
import { auth } from '../../../firebase/config';
import { formatRelative } from 'date-fns';

//style and image
import "./chatMessage.css"
import Image1 from '../../images/images.png'

// connection with Firebase db
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";

function ChatMessage(props) {

  const { text, uid, createdAt} = props.message; 
  
  const usersRef = firestore.collection('users');  
  const [users] = useCollectionData(usersRef, { idField: 'id' });
  
  

  // displaying message's name / photo
  if(users){    
    for (let i = 0; i < users.length; i++) {
      if(users[i].id === uid){
        if(!(auth.currentUser.displayName === users[i].displayName)){
          var userName = users[i].displayName
        }
        var userImg  = users[i].photoURL   
      }      
    }
  }

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const [showActionsButtons, setShowActionsButtons] = useState(false);

  // show/hide delete btn for messages 
  const toggleCard = () => {
    setShowActionsButtons(!showActionsButtons);
  };

  const formatDate = date => {
    let formattedDate = '';
    if (date) {
      // Convert time date 
      formattedDate = formatRelative(date, new Date());
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };  

// delete messages from firestore
function handleDelete(){
    const docRef = doc(firestore, "messages", props.message.id);
    deleteDoc(docRef)    
    .catch(error => {
        console.log(error);
    })
}

  return (<>
    <div className={`message ${messageClass}`} onClick={toggleCard}>
      <div>
        <div className="photoTime"  >
          {users ?
                    <img className="chatMessImg" style={{borderRadius: "50%"}}
                      src={userImg} alt="Admin"
                      width="130" height="130" />
                    : <img className="chatMessImg" style={{borderRadius: "50%"}}
                      src={Image1} alt="Admin"
                      width="130" height="130" />}
                      {auth.currentUser.uid !== uid ? <h6  className="chatName">{userName}</h6> : null}                    
            {createdAt?.seconds ? (
                  <span className="text-gray-500 text-xs">
                    {formatDate(new Date(createdAt.seconds * 1000))}
                  </span>
                ) : null}
             <div
            style={{
              display:
                showActionsButtons && uid === auth.currentUser.uid
                  ? "block"
                  : "none",
            }}
            className="actions"
          >
            <button id="msgDelete" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
      <p className="chatMesPar">{text}</p>
    </div>
  </>)
}

export default ChatMessage;