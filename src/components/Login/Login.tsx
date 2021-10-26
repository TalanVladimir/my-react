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

  const [loadDef, setLoadDef] = useState(false);

  const history = useHistory();

  const defEmail = "batarejka@gmail.com";
  const defPassword = "mypassword";

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) history.replace("/buy");
  }, [user, loading]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <Form
      className='login'
      ref={() => {
        if (!loadDef) {
          setEmail(defEmail);
          setPassword(defPassword);
          setLoadDef(true);
        }
      }}
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Control
          defaultValue={defEmail}
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          defaultValue={defPassword}
          type='password'
          placeholder='Password'
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
