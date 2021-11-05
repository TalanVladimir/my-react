import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import Icon from "../../images/logo.png";

import { logout } from "../../services/firebase";

import { auth, login } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./styles.scss";

const Navigation = ({
  user,
  value,
  page,
  change_user,
  change_email,
}): JSX.Element => {
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
    <Navbar sticky='top' bg='dark' variant='dark' className='navbar-inverse'>
      <Container className='flex-wrap' style={{ justifyContent: "center" }}>
        <Navbar.Brand>
          <img
            src={Icon}
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />{" "}
          My Financies
        </Navbar.Brand>
        <Nav
          variant='pills'
          activeKey={location.pathname}
          className='d-inline-flex ms-md-auto'
        >
          <Nav.Item>
            <Nav.Link as={Link} to='/profile'>
              {name}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav
          variant='pills'
          activeKey={location.pathname}
          className='d-inline-flex ms-md-auto'
        >
          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/buy'
              className={page === "Buy" ? "active" : ""}
            >
              Buy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/financies'
              className={page === "Financies" ? "active" : ""}
            >
              Financies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/profile'
              className={page === "Profile" ? "active" : ""}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                logout().then(() => {
                  setTimeout(
                    () => history.replace(isGit ? "/new-react/" : "/login"),
                    100
                  );
                })
              }
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default connect(
  mapStateToProps(Navigation),
  mapDispatchToProps(Navigation)
)(Navigation);
