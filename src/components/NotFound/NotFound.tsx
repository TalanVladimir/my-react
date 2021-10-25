import React from "react";

import { Link } from "react-router-dom";

import "./styles.scss";

const NotFound = () => {
  return (
    <div className='not-found'>
      <h3>
        404 Error.
        <br />
        Page Not Found.
      </h3>

      <Link className='go-back btn btn-primary' to='/'>
        Back
      </Link>
    </div>
  );
};

export default NotFound;
