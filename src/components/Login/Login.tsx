import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.scss";

const Login = () => {
  const [login, setLogin] = useState<number>(0);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setLogin(login + 1);
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type='text' placeholder='Login' />
      </Form.Group>

      <Form.Group>
        <Form.Control type='password' placeholder='Password' />
      </Form.Group>

      <Form.Group>
        <Button variant='primary' type='submit'>
          Try Login {login == 0 ? "" : login}
        </Button>{" "}
        <Link to='/buy'>
          <Button>Main</Button>
        </Link>{" "}
        <Link to='/404'>
          <Button>404</Button>
        </Link>
      </Form.Group>
    </Form>
  );
};

export default Login;
