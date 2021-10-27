import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import "./styles.scss";

import { db, auth } from "../../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

import BuyItem from "../BuyItem";

import Spinner from "../../Spinner";

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

const defArray = [
  { id: 1, category: "moloko", product: "moloko", price: "500" },
  { id: 21, category: "moloko", product: "moloko", price: "1" },
  { id: 33, category: "moloko", product: "moloko", price: "2555" },
  { id: 44, category: "miaso", product: "moloko", price: "105" },
  { id: 53, category: "miaso", product: "moloko", price: "25" },
  { id: 6, category: "miaso", product: "moloko", price: "25" },
  { id: 7, category: "miaso", product: "moloko", price: "25" },
  { id: 8, category: "miaso", product: "moloko", price: "25" },
];

const BuyList = () => {
  const [data, setData] = useState(defArray);
  const [completed, setcompleted] = useState<boolean>(false);

  useEffect(() => {
    setData(defArray);

    setcompleted(true);
  }, []);

  return (
    <>
      {!completed ? (
        <Spinner />
      ) : (
        <div className='table-responsive'>
          <Container className='buyList mt-1 mb-1'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Nr.</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Product</th>
                  <th scope='col'>Costs</th>
                  <th scope='col'>Event</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <BuyItem key={item.id} index={index}>
                    {item}
                  </BuyItem>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
      )}
    </>
  );
};

export default BuyList;
