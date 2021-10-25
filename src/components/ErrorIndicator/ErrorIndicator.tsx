import React from "react";

import "./styles.scss";

import icon from "../../images/sign-error-icon.png";

const ErrorIndicator = () => {
  return (
    <div className='error-indicator'>
      <img src={icon} alt='error icon' />
      <span className='boom'>Whahaha!</span>
      <span>Error is detected</span>
    </div>
  );
};

export default ErrorIndicator;
