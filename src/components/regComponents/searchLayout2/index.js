import React, {useRef, useEffect, useState } from 'react'
import UsersList from '../usersList';
import { firestore } from '../../../firebase/config';
import { useAuth } from '../../../redux/User/user.sagas';

//style and image
import './style.css'

import { useCollectionData } from 'react-firebase-hooks/firestore';

function SearchLayout2 () {  
  
  const { currentUser } = useAuth()
  console.log(currentUser.uid)
  
  const dummy = useRef();

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {        
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      // Send Axios request here         
    }, 2000)   
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [])

  const usersRef = firestore.collection('users');
  const query = usersRef.orderBy('createdDate')
  const [users] = useCollectionData(query, { idField: 'id' });    

  // const messagesRef = firestore.collection('messages');
  // const query2 = messagesRef.orderBy('createdAt')
  // const [messages] = useCollectionData(query2, { idField: 'id' });
  // console.log(messages)

  // if(messages){for (let i = 0; i < users.length; i++) {
          
  // }}

  // !!!THIS ONE OR NEXT PART OF CODE NEEDS CHANGE => not compile when start typing
// let usersCopy = users;
// if(users){
//   for ( let i = 0; i < usersCopy.length; i++ ) {    
//     if(searchTerm == users[i].displayName ){
//       console.log(usersCopy[i].displayName)      
//     } else if(searchTerm == 0){
//       console.log("input empty")
//     }
//     else {
//       console.log("nothing match with this")
//     }
//   } 
// }

  // !!! AFTER RE-RENDER -> currentUser -> null, need to change this or search input
  // if(users){
  //   for (let i = 0; i < users.length; i++) { 
  //     if( currentUser.email == users[i].email){
  //       users[i] = null;         
  //     } else {
  //       users[i]
  //     }
  //   }  
  // }
    // only works before reload page -> users first == undefined!
    // for (let i = 0; i < users.length; i++) {
    //     console.log(users[i].displayName)
    // }

  return (
    <div>
      <h3>WEHELP</h3>
      <input autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} type="search" className="searchInput" placeholder = "Search Here..." /> 

      <main className="messages">
        {users && users.map(usr => <UsersList key={usr != null && usr.id} user={usr != null && usr} />)}
        <span ref={dummy}></span>
      </main>  

    </div>
  )
}

export default SearchLayout2
