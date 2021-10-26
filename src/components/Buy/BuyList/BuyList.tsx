import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import "./styles.scss";

import { db, auth } from "../../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

async function newDoc() {
  try {
    const docRef = await addDoc(collection(db, "accounts"), {
      first: "Name",
      last: "Surname",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

newDoc();

const BuyList = () => {
  return (
    <section className='buyList'>
      <Container>
        Buy
        <img
          src='https://thumbs.dreamstime.com/b/under-construction-10012274.jpg'
          className='rounded img-fluid align-self-center'
          alt='...'
        />
      </Container>
    </section>
  );
};

export default BuyList;
