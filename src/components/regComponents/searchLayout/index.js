import React, {useRef, useEffect } from 'react'
import { auth } from '../../../firebase/config'

import { firestore } from '../../../firebase/config';
import Image1 from '../../images/images.png';

//style and image
import './style.css'
// import ChatUser from '../chatUser/ChatUser';

import { useCollectionData } from 'react-firebase-hooks/firestore';

function SearchChat () {  

    // const { photoURL, displayName } = props.users;  

    // need to do like this for users, maybe need separate user to another component, it's not working...
    // another one inside functions, maybe there need to write smth!!! because for messages firestore there has!!!
    // const { displayName, photoURL, photoURL, email} = props.message; 
    
    const { photoURL, displayName } = auth.currentUser;

    const usersClass = displayName === auth.currentUser.displayName ? 'sent' : 'received';

    const dummy = useRef();

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });        
    }, [])

    const usersRef = firestore.collection('users');
    const query = usersRef.orderBy('createdDate')
    const [users] = useCollectionData(query, { idField: 'id' }); 

    return (
        <div>
            <h3>WEHELP</h3>
            <input type="search" className="searchInput" placeholder = "Search Here..." /> 

            <main className="messages">   
                {users && users.map((usr) =>

                    <div key={usr.id} className={`user ${usersClass}`}>
                        <div>
                            <div className="photoTime"></div>
                                {photoURL ?
                                    <img  style={{borderRadius: "50%"}}
                                    src={photoURL} alt="Admin"
                                    width="50" height="50" />
                                    : <img style={{borderRadius: "50%"}}
                                    src={Image1} alt="Admin"
                                    width="50" height="50" />}
                                {displayName ? displayName : <h6>Admin</h6>}
                {/* <p className="chatMesPar">{text}</p> */}                       
                        </div>
                    </div>
                )} 

               <span ref={dummy}></span>      
                
            </main>       
            
        </div>
    )
}

export default SearchChat
