import React, {useRef, useEffect, useState } from 'react'
import UsersList from '../usersList';
import { firestore } from '../../../firebase/config';

import './style.css'

import { useCollectionData } from 'react-firebase-hooks/firestore';

function SearchLayout () {   
    
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

  return (
    <div>
      <h3>UniqueChat</h3>
      <input autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} type="search" className="searchInput" placeholder = "Search Here..." /> 

      <main className="messages">
        {users && users.map(usr => <UsersList key={usr != null && usr.id} user={usr != null && usr} />)}
        <span ref={dummy}></span>
      </main>  

    </div>
  )
}

export default SearchLayout
