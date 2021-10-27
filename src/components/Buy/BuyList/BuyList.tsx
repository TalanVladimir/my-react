import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

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
  { id: 1, category: "1 category", product: "1 product", price: "1" },
  { id: 2, category: "2 category", product: "2 product", price: "2" },
  { id: 3, category: "3 category", product: "3 product", price: "3" },
  { id: 4, category: "4 category", product: "4 product", price: "4" },
  { id: 5, category: "5 category", product: "5 product", price: "5" },
];

const BuyList = () => {
  const [data, setData] = useState(defArray);
  const [completed, setcompleted] = useState<boolean>(false);

  useEffect(() => {
    setData(defArray);
    // setcompleted(true);
    const pushArray = defArray.sort((a, b) => {
      return a.id - b.id;
    });

    setData(pushArray);
  }, []);

  useEffect(() => {
    setcompleted(true);
  }, [data]);

  const addItem = () => {
    setcompleted(false);

    const getId = defArray.reduce((max: number, array) => {
      if (array.id > max) max = array.id;
      return max;
    }, 0);

    const newArray = [...data];

    newArray.push({
      id: getId + 1,
      category: "",
      product: "",
      price: "",
    });

    setData(newArray);
  };

  const updateItem = (
    id: number,
    category: string,
    product: string,
    price: string
  ) => {
    setcompleted(false);

    const getIndex = data.findIndex((item) => item.id === id);

    const newItem = { id, category, product, price };

    const newArray = [
      ...data.slice(0, getIndex),
      newItem,
      ...data.slice(getIndex + 1),
    ];

    setData(newArray);
  };

  const deleteItem = (id: number) => {
    setcompleted(false);

    const getIndex = data.findIndex((item) => item.id === id);
    const newArray = [...data];
    newArray.splice(getIndex, 1);

    setData(newArray);
  };

  return (
    <>
      {!completed ? (
        <Spinner />
      ) : (
        <div className='table-responsive'>
          <div className='table-wrapper'>
            <Container className='buyList mt-1 mb-1'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>Nr.</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Product</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>
                      <a onClick={() => addItem()}>Add</a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <BuyItem
                      key={item.id}
                      index={index}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                    >
                      {item}
                    </BuyItem>
                  ))}
                </tbody>
              </table>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyList;
