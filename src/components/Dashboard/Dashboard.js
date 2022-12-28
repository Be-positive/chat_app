import React, { useState, useEffect } from "react";

//components
import SearchLayout from "../regComponents/searchLayout";
import CenterChat from "../regComponents/centerChat";
import RightProfile from "../regComponents/rightProfile";
import Spinner from '../Spinner/Spinner'

import { Button } from "reactstrap";

// style 
import "./style.css";

const DashBoard = () => {  

  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [ showCloseBtn, setShowCloseBtn] = useState(false)

  const [showUsersInfo, setShowUsersInfo] = useState(false);
  const [showCloseUsersBtn, setshowCloseUsersBtn] = useState(false)

  
  // SHOWED UP and CLOSED PROFILE INFO WHEN WINDOW SIZE LESS THEN 1100
  const showProfile = (e) => {  
    e.stopPropagation()
    setShowProfileInfo(true)
    setShowCloseBtn(true)                                 
  }
  const closeProfile = (e) => {
    e.stopPropagation()       
    setShowProfileInfo(false) 
    setShowCloseBtn(false)
  }

  // SHOWED UP and CLOSED USERS LIST WHEN WINDOW SIZE LESS THEN 820
  const showUsers = (e) => {  
    e.stopPropagation()
    setShowUsersInfo(true)
    setshowCloseUsersBtn(true)                                 
  }
  const hideUsers = (e) => {
    e.stopPropagation()       
    setShowUsersInfo(false)
    setshowCloseUsersBtn(false)
  }

  // CHECK LOADING STATE
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // SHOWED UP MAIN CHAT COMPONENT AND HIDE MAIN USERS LIST COMPONENT 
  function chatProfile(){
    var leftSide = document.getElementById('leftSide')
    var chatProfile = document.getElementById('chatProfile')
    chatProfile.style.display = "flex"; 
    
    //not working "inner width" the same in mobile and pc, it's not reading in mobile version anyway 
    if(window.innerWidth <= 820){      
      leftSide.style.display = "none";
    }     
  }

  return (
    
    <section id="dashboard">
      {loading && <Spinner />}      
      <center className="mainLand">

        <div className="leftSide" id="leftSide" onClick={chatProfile} >
          <SearchLayout />
        </div>

        <div className="center" id="chatProfile" style={{display: "none"}}>
          <div className="profileInfo">
            <Button  id='usersBtn' onClick={showUsers} color="primary" size="lg" className="usersBtn">Users</Button>
            <div id='usersList' style={{transform: showUsersInfo ? "translate3d(0vw, 0, 0)" : "translate3d(-200vw, 0, 0)"}}>
              <button id='closeUsers' style={{transform: showCloseUsersBtn ? "translate3d(0vw, 0, 0)" : "translate3d(-200vw, 0, 0)"}} onClick={hideUsers}>CLOSE</button>
              <SearchLayout /> 
            </div>

            <Button  id='profileBtn' onClick={showProfile}  className="profileBtn">Profile <i className="fas fa-user"></i> </Button>
            <div id='profileAdmin' style={{transform: showProfileInfo ? "translate3d(0vw, 0, 0)" : "translate3d(200vw, 0, 0)"}}>
              <button id='closeProfile' style={{transform: showCloseBtn ? "translate3d(0vw, 0, 0)" : "translate3d(200vw, 0, 0)"}} onClick={closeProfile}>CLOSE</button>
              <RightProfile /> 
            </div>
            
          </div>    
          <div id="centerChat" onClick={() => {setShowUsersInfo(false); setShowProfileInfo(false)}}>
            <CenterChat/>            
          </div>                   
        </div>

        <div className="rightSide" >
          <RightProfile  className="rightProfile" />          
        </div>
        
      </center>
    </section>
  );
};
export default DashBoard;
