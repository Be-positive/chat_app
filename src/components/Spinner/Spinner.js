import React from "react";
import './Spinner.css'

const Spinner = () => (
  <div className="spinner">
    <div className="circle">
      <label>Loding...</label>
      <div className="circle-child" />
    </div>
  </div>
);

export default Spinner;
