import React from "react";
import { auth } from "../../../firebase/config";
import _ from 'lodash';

// take data from firestore
import { firestore } from '../../../firebase/config';
import { doc, setDoc } from "firebase/firestore";

import "./userListStyle.css"

function UsersList(props) {
  
    const { id, uid, displayName, photoURL, text } = props.user; 
    
    const chatStart = () => {  
      
      const docRef = doc(firestore, "rooms", "NjDxH6iSvaIWmZfLbYsN");
      const data = {
        roomNumber: auth.currentUser.uid.slice(0, 5) + id.slice(0, 5)
      };

      setDoc(docRef, data)
       .then(() => {
        // console.log(docRef)
           console.log("Rooms are changed successfully");
       })
       .catch(error => {
           console.log(error);
       })
     }; 
 
    const textChat = () => {
        const str = text;
        const truncate = _.truncate 
        if(!str){
          return ""
        }
        else if(str.length < 15){
          return text
        }    
        else{      
          return truncate(str, {
            length: 30,
            separator: /,?\.* +/ 
          })            
        } 
      }
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    return (<>    
      <div onClick={chatStart} id="userTop" className={`message ${messageClass}`}> 
        <div className="userList" >
            <div className="photoTime">
                {(photoURL || displayName) &&
                  <img className="userListImg" src={photoURL} />
                }
                <div className="nameText">
                    {displayName && <h6 className="listName">{displayName}</h6>}
                    {text && <h6 className="listText">{textChat()}</h6>}                    
                </div>                               
            </div>
        </div>
      </div>
    
  </>)
}

export default UsersList;