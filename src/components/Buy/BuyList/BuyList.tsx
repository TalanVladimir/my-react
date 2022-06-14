import React, { useState, useEffect } from "react";

import * as Material from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import "./styles.scss";

import { db } from "../../../services/firebase";
import {
  query,
  where,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

import { connect } from "react-redux";
import mapStateToProps from "../../../store/mapStateToProps";
import mapDispatchToProps from "../../../store/mapDispatchToProps";

import { sortProducts } from "./Utils";

import Spinner from "../../Spinner";
import BuyItem from "../BuyItem";
import BuyModify from "../BuyModify";

const buyRef = collection(db, "buy");
const productRef = collection(db, "product");

const defItem = { category: "", product: "", multiply: "", price: "" };

import { Item, Product } from "../../../types/Buy.types";

const BuyList = (props: any) => {
  const [data, setData] = useState<Array<Item>>([]);
  const [current, setCurrent] = useState({});
  const [completed, setcompleted] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    props.change_page("Buy");
  }, []);

  useEffect(() => {
    setTimeout(() => setcompleted(true), 100);
  }, [data]);

  useEffect(() => {
    getData();
  }, [props.email]);

  const fetchSnapshot = (
    querySnapshot: QuerySnapshot<DocumentData> | any[]
  ) => {
    const newArray: Array<Item> = [];
    querySnapshot.forEach((doc: any) => {
      const { id, category, product, multiply, price, email } = doc.data();
      const getItem = {
        id,
        category,
        product,
        multiply,
        price,
        email,
      };
      newArray.push(getItem);
    });

    return sortProducts(newArray);
  };

  const getData = async () => {
    const emailArray = [];

    const { email } = props;
    emailArray.push(email);
    if (email === "vovkus@gmail.com") {
      emailArray.push("test@test.com");
    }
    console.log(JSON.stringify(email));
    const querySnapshot = await getDocs(
      query(collection(db, "buy"), where("email", "in", emailArray))
    );
    const itemsArray = fetchSnapshot(querySnapshot);
    setData(itemsArray);
  };

  const addNewProduct = async (newItem: Item) => {
    const querySnapshot = await getDocs(
      query(
        productRef,
        where("category", "==", newItem.category),
        where("product", "==", newItem.product)
      )
    );
    let isId = false;
    querySnapshot.forEach((doc) => {
      isId = true;
    });

    if (!isId) {
      const querySnapshot = await getDocs(query(productRef));

      const newArray: Array<Product> = [];
      querySnapshot.forEach((doc: any) => {
        const { id, category, product } = doc.data();
        const getItem = {
          id,
          category,
          product,
        };
        newArray.push(getItem);
      });

      let getId: number = newArray.reduce((max: number, item: Product) => {
        if (item.id > max) max = item.id;
        return ++max;
      }, 1);

      const newObj = {
        id: getId,
        category: newItem.category,
        product: newItem.product,
      };

      try {
        await setDoc(doc(productRef, `${newObj.id}`), newObj);
      } catch {}
    }
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

    addNewProduct(newItem);

    try {
      await setDoc(doc(buyRef, `${newObj.id}`), newObj);
      setData(sortProducts(newArray));
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

    addNewProduct(newItem);

    try {
      await setDoc(doc(buyRef, `${upd.id}`), upd);
      setData(sortProducts(newArray));
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
      setData(sortProducts(newArray));
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

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", width: 500 },
    { field: "col2", headerName: "Column 2", width: 500 },
  ];

  const renderItems = () => {
    return (
      <Material.Grid container>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onCellClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;

              alert(JSON.stringify(params.row));
            }
          }}
        />
        {/* <DataGrid rows={rows} columns={columns} /> */}
      </Material.Grid>
      // <Container className='buyList mt-1 mb-1'>
      //   <div className='table-responsive'>
      //     <Table className='table-striped'>
      //       <thead
      //         onClick={() => {
      //           setCreate();
      //         }}
      //       >
      //         <tr>
      //           <th scope='col'>Nr.</th>
      //           <th scope='col'>Category</th>
      //           <th scope='col'>Product</th>
      //           <th scope='col'>X</th>
      //           <th scope='col'>Price</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {data.map((item: Item, index: Number) => (
      //           <BuyItem key={item.id} index={index} setModify={setModify}>
      //             {item}
      //           </BuyItem>
      //         ))}
      //       </tbody>
      //     </Table>
      //   </div>
      //   {renderModify()}
      // </Container>
    );
  };

  return <>{!completed ? <Spinner /> : renderItems()}</>;
};

export default connect(
  mapStateToProps(BuyList),
  mapDispatchToProps(BuyList)
)(BuyList);
