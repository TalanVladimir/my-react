import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../../services/firebase";

import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [wrong, setWrong] = useState<boolean>(false);

  const history = useHistory();

  const defEmail = "batarejka@gmail.com";
  const defPassword = "mypassword";

  useEffect(() => {
    setEmail(defEmail);
    setPassword(defPassword);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) history.replace("/buy");
  }, [user, loading]);

  useEffect(() => {
    if (error) {
      alert("error detected");
    }
  }, [error]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    login(email, password);

    setTimeout(() => setWrong(true), 500);
  };

  return (
    <Form className='login' onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          defaultValue={defEmail}
          type='text'
          placeholder='Email'
          value={email}
          className={wrong ? "wrong" : ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          defaultValue={defPassword}
          type='password'
          placeholder='Password'
          value={password}
          className={wrong ? "wrong" : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Login
      </Button>
      <Button
        variant='secondary'
        type='button'
        onClick={() => {
          history.replace("/register");
        }}
      >
        Register Page
      </Button>
    </Form>
  );
};

export default Login;
