import React, {useRef, useEffect, useState } from 'react'
import UsersList from '../usersList';
import { firestore } from '../../../firebase/config';

//style and image
import './style.css'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from "../../../redux/User/user.sagas";

function SearchLayout () {  

  // everything work fine like i want but can add then result 0, if not of them match...  
  const { currentUser } = useAuth()
       
  const dummy = useRef();

  const [searchTerm, setSearchTerm] = useState('')

  // searching in real Time
  useEffect(() => {  
    const delayDebounceFn = setTimeout(() => {
      // console.log(searchTerm)    
    }, 2000)      
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // add scrolling effect
  useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [])

  //taking users from firestoreDB and order it by creating Date 
  const usersRef = firestore.collection('users');
  const query = usersRef.orderBy('createdDate')
  const [users] = useCollectionData(query, { idField: 'id' });  

  return (
    <div>      
      <h3>Helpsy</h3>      
      
      <input autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} type="search" className="searchInput" placeholder = "Search Here..." /> 

      <main className="messages">
        {users && users.map(function(usr){
          if(usr.displayName.indexOf(searchTerm) > -1){          
          return <UsersList key={usr != null && usr.id} user={usr != null && usr.id != currentUser.uid  && usr} />
          } 
         })}

        <span ref={dummy}></span>
      </main>  
    </div>
  )
}

export default SearchLayout
