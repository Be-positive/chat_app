import React, {useState} from 'react'
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "../../../redux/User/user.actions";
import { Alert, Button } from "reactstrap";

import { useAuth } from "../../../redux/User/user.sagas";

//style and images
import Image1 from '../../images/images.png';
import './style.css'

function RightProfile() {
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState("");
  
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
            {currentUser.photoURL ?
              <img style={{borderRadius: "50%"}}
                   src={currentUser.photoURL} alt="Admin"
                   width="130" height="130" />
              : <img style={{borderRadius: "50%"}}
                     src={Image1} alt="Admin"
                     width="130" height="130" />}
          {/* photoUrl exist only with entering through google or social media... */}

          {currentUser.displayName ? <h6> {currentUser.displayName }</h6> : <h6>Admin</h6>}
          {/* it's grab info from google account but inside your form it's useless */}

          <h6><i style={{color: "gray"}} className="far fa-envelope"/> {currentUser.email}</h6>

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
