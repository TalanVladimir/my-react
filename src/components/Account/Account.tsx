import React from "react";
import { Container } from "react-bootstrap";

import "./styles.scss";

const Account = () => {
  return (
    <section className='account'>
      <Container>
        Account
        <img
          src='https://thumbs.dreamstime.com/b/under-construction-10012274.jpg'
          className='rounded img-fluid align-self-center'
          alt='...'
        />
      </Container>
    </section>
  );
};

export default Account;
