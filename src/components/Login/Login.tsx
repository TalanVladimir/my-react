import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../../services/firebase";

// import { Spinner } from "react-bootstrap";
import Spinner from "../Spinner";

import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [wrong, setWrong] = useState<boolean>(false);

  const history = useHistory();

  const defEmail = "test@test.com";
  const defPassword = "TestTest123";

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    login(email, password);

    setWrong(true);
    setTimeout(() => {
      setWrong(false);
    }, 2000);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form className='login' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              defaultValue={defEmail}
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              defaultValue={defPassword}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' disabled={wrong}>
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
      )}
    </>
  );
};

export default Login;
