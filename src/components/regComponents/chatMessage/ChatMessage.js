import React, {useState} from "react";
import { auth } from '../../../firebase/config';
import { formatRelative } from 'date-fns';

//style and image
import "./chatMessage.css"
import Image1 from '../../images/images.png'

function ChatMessage(props, { handleDelete} ) {

  const { text, uid, createdAt, photoURL, id} = props.message; 

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const [showActionsButtons, setShowActionsButtons] = useState(false);

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

  return (<>
    <div className={`message ${messageClass}`}>
      <div>
        <div className="photoTime" onClick={toggleCard} >
          {photoURL ?
                    <img className="chatMessImg" style={{borderRadius: "50%"}}
                      src={photoURL} alt="Admin"
                      width="130" height="130" />
                    : <img className="chatMessImg" style={{borderRadius: "50%"}}
                      src={Image1} alt="Admin"
                      width="130" height="130" />}
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
            {/* handleDelte is not function! Needs to do different! */}
            <button onClick={() => handleDelete(createdAt, id)}>Delete</button>
          </div>
        </div>
      </div>
      <p className="chatMesPar">{text}</p>
    </div>
  </>)
}

export default ChatMessage;