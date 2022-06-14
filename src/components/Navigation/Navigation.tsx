import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import * as Material from "@mui/material";

import Icon from "../../images/logo.png";

import { logout } from "../../services/firebase";

import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./styles.scss";

const Navigation = (props: any): JSX.Element => {
  const { user, value, page, change_user, change_email } = props;
  const isGit = document.location.host === "talanvladimir.github.io";
  const history = useHistory();

  const [name, setName] = useState("");

  const check_user = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        change_user(user);
        change_email(user.email);
        const uid = user.uid;

        setName(user.displayName);
      } else {
        logout().then(() => {
          setTimeout(
            () => history.replace(isGit ? "/new-react/" : "/login"),
            100
          );
        });
      }
    });
  };

  useEffect(() => {
    check_user();
  }, []);

  return (
    <Fragment>
      <Material.AppBar
        position='sticky'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Material.Toolbar sx={{ flexWrap: "wrap" }}>
          <Material.Typography
            variant='h6'
            color='text.secondary'
            noWrap
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
            sx={{ flexGrow: 1 }}
          >
            <img
              src={Icon}
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />{" "}
            My Financies
          </Material.Typography>
          <nav>
            <Material.Link
              component={Link}
              variant='button'
              color='text.primary'
              to='/buy'
              sx={{ my: 1, mx: 1.5 }}
            >
              Buy
            </Material.Link>
            <Material.Link
              component={Link}
              variant='button'
              color='text.primary'
              to='/financies'
              sx={{ my: 1, mx: 1.5 }}
            >
              Financies
            </Material.Link>
            <Material.Link
              component={Link}
              variant='button'
              color='text.primary'
              to='/profile'
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Material.Link>
          </nav>
          <Material.Link
            component={Link}
            variant='button'
            color='text.primary'
            to='/'
            onClick={() =>
              logout().then(() => {
                setTimeout(
                  () => history.replace(isGit ? "/new-react/" : "/login"),
                  100
                );
              })
            }
            sx={{ my: 1, mx: 1.5 }}
          >
            Log out
          </Material.Link>
        </Material.Toolbar>
      </Material.AppBar>
    </Fragment>
  );
};

export default connect(
  mapStateToProps(Navigation),
  mapDispatchToProps(Navigation)
)(Navigation);
