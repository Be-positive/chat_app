import React from "react";
import { auth } from "../../../firebase/config";
import _ from 'lodash';

//style and image
import "./userListStyle.css"
// import Image1 from '../../images/images.png'

function UsersList(props) {
    
    const { uid, displayName, photoURL, text } = props.user;   
    
    // const { text } = props.message
  
    function chatStart() {
        console.log(displayName)        
    }    
    
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
    <div id="userTop" onClick={chatStart} className={`message ${messageClass}`}>
        <div className="userList">
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