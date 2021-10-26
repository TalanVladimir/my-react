import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, register } from "../../services/firebase";

import "./styles.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) history.replace("/buy");
  }, [user, loading]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    register(email, password);
  };

  return (
    <Form className='register' onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Register
      </Button>
      <Button
        variant='secondary'
        type='button'
        onClick={() => {
          history.replace("/login");
        }}
      >
        Login Page
      </Button>
    </Form>
  );
};

export default Register;
