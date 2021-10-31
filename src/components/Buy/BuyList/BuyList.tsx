import React, { Fragment, useState, useEffect } from "react";
import { Container, Table, Button, Tab } from "react-bootstrap";

import "./styles.scss";

import { db } from "../../../services/firebase";
import {
  query,
  where,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

import Spinner from "../../Spinner";
import BuyItem from "../BuyItem";
import BuyModify from "../BuyModify";

const buyRef = collection(db, "buy");

const defItem = { category: "", product: "", multiply: "", price: "" };

import Item from "../Item";

const BuyList = () => {
  const [data, setData] = useState<Array<Item>>([]);
  const [current, setCurrent] = useState({});
  const [completed, setcompleted] = useState<boolean>(false);

  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setcompleted(true);
  }, [data]);

  const fetchSnapshot = (
    querySnapshot: QuerySnapshot<DocumentData> | any[]
  ) => {
    const newArray: Array<Item> = [];
    querySnapshot.forEach((doc: any) => {
      const { id, category, product, multiply, price } = doc.data();
      const getItem = {
        id,
        category,
        product,
        multiply,
        price,
      };
      newArray.push(getItem);
    });

    const pushArray = newArray.sort((a: Item, b: Item) => {
      return a.id - b.id;
    });

    return pushArray;
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "buy"));
    const itemsArray = fetchSnapshot(querySnapshot);
    setData(itemsArray);
  };

  const addItem = async (newItem: Item) => {
    setcompleted(false);

    const querySnapshot = await getDocs(collection(db, "buy"));
    const itemsArray = fetchSnapshot(querySnapshot);

    let getId: number = itemsArray.reduce((max: number, item: Item) => {
      if (item.id > max) max = item.id;
      return ++max;
    }, 1);

    const newObj = { ...newItem, id: getId };
    const newArray = [...data];
    newArray.push(newObj);

    try {
      await setDoc(doc(buyRef, `${newObj.id}`), newObj);

      await addDoc(buyRef, newObj);
      setData(newArray);
      setcompleted(true);
      setDisplay("");
    } catch (e) {}
  };

  const updateItem = async (newItem: Item) => {
    setcompleted(false);

    const getIndex = data.findIndex((item: Item) => item.id === newItem.id);
    const newArray = [
      ...data.slice(0, getIndex),
      newItem,
      ...data.slice(getIndex + 1),
    ];

    const upd = { ...newItem };
    upd.id = +upd.id;

    try {
      await setDoc(doc(buyRef, `${upd.id}`), upd);

      setData(newArray);
      setDisplay("");
    } catch {}
  };

  const deleteItem = async (newItem: Item) => {
    setcompleted(false);

    try {
      await deleteDoc(doc(buyRef, `${newItem.id}`));
      const getIndex = data.findIndex((item: Item) => item.id === newItem.id);
      const newArray = [...data];
      newArray.splice(getIndex, 1);

      setData(newArray);
      setDisplay("");
    } catch {}
  };

  const setCreate = () => {
    const item = { ...defItem };
    setCurrent(item);
    setDisplay("create");
  };

  const setModify = (item: Item) => {
    setCurrent(item);
    setDisplay("modify");
  };

  const closeDisplay = () => {
    setDisplay("");
  };

  const renderModify = () => {
    if (display) {
      return (
        <BuyModify
          display={display}
          addItem={addItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
          closeDisplay={closeDisplay}
        >
          {current}
        </BuyModify>
      );
    }
  };

  const renderItems = () => {
    return (
      <Fragment>
        <Container className='buyList mt-1 mb-1'>
          <div className='table-responsive'>
            <Table className='table-striped'>
              <thead
                onClick={() => {
                  setCreate();
                }}
              >
                <tr>
                  <th scope='col'>Nr.</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Product</th>
                  <th scope='col'>X</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: Item, index: Number) => (
                  <BuyItem key={item.id} index={index} setModify={setModify}>
                    {item}
                  </BuyItem>
                ))}
              </tbody>
            </Table>
          </div>
          {renderModify()}
        </Container>
      </Fragment>
    );
  };

  return <>{!completed ? <Spinner /> : renderItems()}</>;
};

export default BuyList;
