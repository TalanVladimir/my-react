import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

import { auth, update } from "../../services/firebase";

import "./styles.scss";

import defPhoto from "../../images/default_user.png";

const Account = () => {
  const [name, setName] = useState<string>("loading");
  const [email, setEmail] = useState<string>("loading");
  const [photo, setPhoto] = useState<string>(defPhoto);
  const [verify, setVerify] = useState<string>("loading");

  update({ displayName: "HamsteR" });

  const menas = async () => {
    const user = await auth.currentUser;

    if (user != null) {
      if (email != user.email) {
        if (user.displayName != null) setName(user.displayName);
        if (user.email != null) setEmail(user.email);
        if (user.photoURL != null) setPhoto(user.photoURL);
        if (user.emailVerified != null)
          user.emailVerified
            ? setVerify("Verified")
            : setVerify("Not Verified");
      }
    }
  };

  useEffect(() => {});

  setTimeout(() => menas(), 1000);

  return (
    <section className='profile'>
      <Form
      // ref={() => {
      //   if (!loadDef) {
      //     setEmail(defEmail);
      //     setPassword(defPassword);
      //     setLoadDef(true);
      //   }
      // }}
      // onSubmit={handleSubmit}
      >
        <Container className='rounded bg-white mt-1 mb-1'>
          <Row className='justify-content-center'>
            <div className='col-md-3 border-right'>
              <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
                <img
                  className='rounded-circle mt-5'
                  width='150px'
                  src={photo}
                />
                <span className='font-weight-bold'>{name}</span>
                <span className='text-black-50'>{email}</span>
                <span> </span>
              </div>
            </div>
            <div className='col-md-6 border-right'>
              <div className='p-3 py-5'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h4 className='text-right'>Profile Settings</h4>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Display Name</label>
                    <input
                      readOnly
                      type='text'
                      className='form-control'
                      value={name}
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Email Verify</label>
                    <input
                      readOnly
                      type='text'
                      className='form-control'
                      value={verify}
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Photo url</label>
                    <input
                      readOnly
                      type='text'
                      className='form-control'
                      value={photo === defPhoto ? "loading" : photo}
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='labels'>Email</label>
                    <input
                      readOnly
                      type='text'
                      className='form-control'
                      value={email}
                    />
                  </div>
                </div>
                <div className='mt-5 text-center'>
                  <button
                    className='btn btn-primary profile-button'
                    type='button'
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </Form>
    </section>
  );
};

export default Account;
