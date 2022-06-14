import React, { useState, useEffect, Fragment } from "react";

import { useHistory } from "react-router-dom";

import * as Material from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../../services/firebase";

import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import Spinner from "../Spinner";

import "./styles.scss";

const Login = (props: any) => {
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
        <Material.Grid
          container
          spacing={0}
          style={{ justifyContent: "center", flexDirection: "row" }}
        >
          <Material.Grid item>
            <Material.Grid
              container
              style={{ flexDirection: "column", justifyContent: "center" }}
              spacing={2}
              className='login-form'
            >
              <Material.Paper
                variant='elevation'
                elevation={2}
                className='login-background'
              >
                <form className='login' onSubmit={handleSubmit}>
                  <Material.Grid container direction='column' spacing={2}>
                    <Material.Grid item>
                      <Material.Typography component='h1' variant='h5'>
                        Sign in
                      </Material.Typography>
                    </Material.Grid>
                    <Material.Grid item>
                      <Material.TextField
                        type='email'
                        placeholder='Email'
                        fullWidth
                        name='email'
                        variant='outlined'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Material.Grid>
                    <Material.Grid item>
                      <Material.TextField
                        type='password'
                        placeholder='Password'
                        fullWidth
                        name='password'
                        variant='outlined'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Material.Grid>
                    <Material.Grid item>
                      <Material.Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                        onClick={() => {
                          setEmail(defEmail);
                          setPassword(defPassword);
                        }}
                      >
                        Default login
                      </Material.Button>
                    </Material.Grid>
                    <Material.Grid item>
                      <Material.Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                      >
                        Submit
                      </Material.Button>
                    </Material.Grid>
                    <Material.Grid item>
                      <Material.Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                        onClick={() => {
                          history.replace("/register");
                        }}
                      >
                        Register
                      </Material.Button>
                    </Material.Grid>
                  </Material.Grid>
                </form>
              </Material.Paper>
            </Material.Grid>
          </Material.Grid>
        </Material.Grid>
      )}
    </>
  );
};

export default connect(
  mapStateToProps(Login),
  mapDispatchToProps(Login)
)(Login);
