import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

import Icon from "../../images/logo.png";

import "./styles.scss";

const Navigation = () => {
  return (
    <Navbar sticky='top' bg='dark' variant='dark' className='navbar-inverse'>
      <Container>
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
            <Nav.Link as={Link} to='/buy'>
              Buy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/financies'>
              Financies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/account'>
              Account
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/logout'>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
