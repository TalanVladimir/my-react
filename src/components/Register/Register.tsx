import React, { useState, useEffect } from "react";

import * as Material from "@mui/material";

import { useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, register } from "../../services/firebase";

import "./styles.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [wrong, setWrong] = useState<boolean>(false);

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

    setWrong(true);
    setTimeout(() => {
      setWrong(false);
    }, 2000);
  };

  return (
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
                    Sign up
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
                  >
                    Register
                  </Material.Button>
                </Material.Grid>
                <Material.Grid item>
                  <Material.Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    className='button-block'
                    onClick={() => {
                      history.replace("/login");
                    }}
                  >
                    Login
                  </Material.Button>
                </Material.Grid>
              </Material.Grid>
            </form>
          </Material.Paper>
        </Material.Grid>
      </Material.Grid>
    </Material.Grid>
  );
};

export default Register;
