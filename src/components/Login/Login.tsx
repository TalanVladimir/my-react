import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../../services/firebase";

import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import Spinner from "../Spinner";

import "./styles.scss";

const Login = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [wrong, setWrong] = useState<boolean>(false);

  const history = useHistory();

  const defEmail = "test@test.com";
  const defPassword = "TestTest123";

  const { change_user } = props;

  useEffect(() => {}, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      change_user(user);
      history.replace("/buy");
    }
  }, [loading, user]);

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
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='input-group'>
            <Button
              className='form-control'
              variant='primary'
              type='submit'
              disabled={wrong}
              onClick={() => {
                setEmail(defEmail);
                setPassword(defPassword);
              }}
            >
              Test Login
            </Button>
            <Button
              className='form-control'
              variant='primary'
              type='submit'
              disabled={wrong}
            >
              Login
            </Button>
          </Form.Group>
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

export default connect(
  mapStateToProps(Login),
  mapDispatchToProps(Login)
)(Login);
