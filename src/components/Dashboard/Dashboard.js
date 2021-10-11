import React, { useState, useEffect } from "react";

//components
import SearchLayout2 from "../regComponents/searchLayout2";
import CenterChat from "../regComponents/centerChat";
import RightProfile from "../regComponents/rightProfile";
import Spinner from '../Spinner/Spinner'

import { Button } from "reactstrap";

// style 
import "./style.css";

const DashBoard = () => {  

  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [ showCloseBtn, setShowCloseBtn] = useState(false)
  
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
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    
    <section id="dashboard">
      {loading && <Spinner />}      
      <center className="mainLand">

        <div className="leftSide">
          <SearchLayout2 />
        </div>

        <div className="center">
          <div className="profileInfo">
            <Button  id='profileBtn' onClick={showProfile}  className="profileBtn">Profile <i className="fas fa-user"></i> </Button>
            <div id='profileAdmin' style={{transform: showProfileInfo ? "translate3d(0vw, 0, 0)" : "translate3d(200vw, 0, 0)"}}>
              <button id='closeProfile' style={{transform: showCloseBtn ? "translate3d(0vw, 0, 0)" : "translate3d(200vw, 0, 0)"}} onClick={closeProfile}>CLOSE</button>
              <RightProfile /> 
            </div>
          </div>            
          <CenterChat  /> 
        </div>

        <div className="rightSide">
          <RightProfile  className="rightProfile" />          
        </div>
        
      </center>
    </section>
  );
};
export default DashBoard;
