import React, { useState, useEffect } from "react";
import { Container, Form, Row } from "react-bootstrap";

import { User } from "@firebase/auth/dist/auth-public";
import { auth, update, send } from "../../services/firebase";

import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import Spinner from "../Spinner";

import "./styles.scss";

import defPhoto from "../../images/default_user.png";

const Account = ({ change_page }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [photo, setPhoto] = useState<string | undefined>(defPhoto);
  const [verify, setVerify] = useState<boolean>(false);

  const [completed, setcompleted] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const updateUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(auth.currentUser);
      } else {
      }
    });
  };

  useEffect(() => {
    change_page("Profile");
    updateUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (user != null) {
        if (email != user.email) {
          if (user.displayName != null) setName(user.displayName);
          if (user.email != null) setEmail(user.email);
          if (user.photoURL != null) setPhoto(user.photoURL);
          if (user.emailVerified != false) setVerify(true);
          else setVerify(false);

          setcompleted(true);
        }
      }
    }, 1000);
  }, [user]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (name != null && name.length > 0 && photo != null && photo.length > 0) {
      const updateData = { displayName: name, photoURL: photo };

      setcompleted(false);
      update(updateData).then(() => {
        setcompleted(true);
      });
    }
  };

  return (
    <>
      {!completed ? (
        <Spinner />
      ) : (
        <section className='profile'>
          <Form onSubmit={handleSubmit}>
            <Container className='rounded bg-white mt-1 mb-1'>
              <Row className='justify-content-center'>
                <div className='col-md-3 border-right'>
                  <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
                    <img
                      className='rounded-circle mt-3'
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
                          type='text'
                          className='form-control'
                          onChange={(event) => setName(event?.target.value)}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-md-12'>
                        <label className='labels'>Photo url</label>
                        <input
                          type='text'
                          className='form-control'
                          onChange={(event) => setPhoto(event?.target.value)}
                          value={photo}
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
                        type='submit'
                      >
                        Update Profile
                      </button>{" "}
                      <button
                        className='btn btn-primary profile-button'
                        type='button'
                        disabled={verify}
                        onClick={() => {
                          send();
                        }}
                      >
                        Verify Email
                      </button>
                    </div>
                  </div>
                </div>
              </Row>
            </Container>
          </Form>
        </section>
      )}
    </>
  );
};

export default connect(
  mapStateToProps(Account),
  mapDispatchToProps(Account)
)(Account);
