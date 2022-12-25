import React, {useState} from 'react'
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "../../../redux/User/user.actions";
import { Alert, Button } from "reactstrap";

// connect with firestore db
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../../firebase/config';

// for takeing user
import { useAuth } from "../../../redux/User/user.sagas";

//style and images
import Image1 from '../../images/images.png';
import './style.css'

function RightProfile() {
  
  const { currentUser } = useAuth()

  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  
  // taking users from firestore
  const usersRef = firestore.collection('users');  
  const [users] = useCollectionData(usersRef, { idField: 'id' }); 

  // find amd past current user info
  if(users){    
    for (let i = 0; i < users.length; i++) {
      if(users[i].id === currentUser.uid){
        var userName = users[i].displayName
        var userImg  = users[i].photoURL   
      }
    }
  }
  
  // signout part
  async function signOut() {
    setError("");
    try {
      dispatch(signOutUserStart());
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="rightProfile">
      {users ?
        <img style={{borderRadius: "50%"}}
          src={userImg} alt="Admin"
          width="130" height="130" />
        : <img style={{borderRadius: "50%"}}
          src={Image1} alt="Admin"
          width="130" height="130" />} 

      {users ? <h6> {userName}</h6> : <h6>Admin</h6>}
      
      <h6>
        <i style={{color: "gray"}} className="far fa-envelope"/> {currentUser.email}
      </h6>
      <hr/>
      
      <Button className="logoutBtn" onClick={() => signOut()}>
        Log out <i className="fas fa-sign-out-alt" />
      </Button>
      {error && <Alert color="danger"> {error} </Alert>}
      
      <div className="updateProfile">
        <Link to="/update" style={{ color: "#000" }}>
          change password
        </Link>
      </div>
        
    </div>
  )
}

export default RightProfile
