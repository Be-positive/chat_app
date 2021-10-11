import React from "react";
import { auth } from '../../firebase/config';

//style and image
import "../searchLayout/style.css"
import Image1 from '../../images/images.png';

function ChatUser() {

  // const { photoURL, email, displayName} = props.users; 
  const { photoURL, displayName, email } = auth.currentUser;

  const usersClass = email === auth.currentUser.email ? 'sent' : 'received';
  
  <div className={`user ${usersClass}`}>
      <div>
        <div className="photoTime">
          {photoURL ?
            <img className="chatMessImg" style={{borderRadius: "50%"}}
              src={photoURL} alt="Admin"
              width="130" height="130" />
              : <img className="chatMessImg" style={{borderRadius: "50%"}}
              src={Image1} alt="Admin"
              width="130" height="130" />}
          {displayName ? displayName : <h6>Admin</h6>}
      {/* <p className="chatMesPar">{text}</p> */}
            </div>
        </div>
      </div>
   

}

export default ChatUser;