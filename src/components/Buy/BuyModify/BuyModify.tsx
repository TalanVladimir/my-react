import React, { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";

import "./styles.scss";

import { db } from "../../../services/firebase";
import {
  query,
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

import Item from "../Item";
import Product from "../Product";

const categoryRef = collection(db, "category");
const productRef = collection(db, "product");

const BuyModify = (props: any) => {
  const { display, addItem, updateItem, deleteItem, closeDisplay, children } =
    props;

  const [id, setId] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [multiply, setMultiply] = useState("");
  const [price, setPrice] = useState("");

  const [productList, setProductList] = useState<Array<Product>>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setId(children.id);
    setCategory(children.category);
    setProduct(children.product);
    setMultiply(children.multiply);
    setPrice(children.price);

    getProductList();
  }, [children]);

  const fetchProduct = (querySnapshot: QuerySnapshot<DocumentData> | any[]) => {
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

    const pushArray = newArray.sort((a: Product, b: Product) => {
      if (a.category < b.category) {
        return -1;
      }
      if (a.category > b.category) {
        return 1;
      }
      return 0;
    });

    return pushArray;
  };

  const getProductList = async () => {
    const querySnapshot = await getDocs(query(productRef));
    const newProductList = fetchProduct(querySnapshot);
    setProductList(newProductList);
  };

  const setModalTitle = () => {
    switch (display) {
      case "create":
        return "Create Item";
      case "modify":
        return "Modify Item";
      default:
        return "";
    }
  };

  const setSubmitButton = () => {
    switch (display) {
      case "create":
        return (
          <Button
            type='button'
            className='btn btn-warning'
            onClick={() => {
              const newItem: Item = { id, category, product, multiply, price };
              addItem(newItem);
            }}
          >
            Add
          </Button>
        );
      case "modify":
        return (
          <>
            <Button
              type='button'
              className='btn btn-danger'
              onClick={() => {
                const isDelete = confirm("Confirm delete?");
                if (isDelete) deleteItem(children);
              }}
            >
              Delete
            </Button>
            <Button
              type='button'
              className='btn btn-warning'
              onClick={() => {
                const newItem: Item = {
                  id,
                  category,
                  product,
                  multiply,
                  price,
                };
                addItem(newItem);
              }}
            >
              Dublicate
            </Button>
            <Button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                const newItem: Item = {
                  id,
                  category,
                  product,
                  multiply,
                  price,
                };
                updateItem(newItem);
              }}
            >
              Update
            </Button>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div
      className={`modal fade${display !== "" ? " show" : ""}`}
      role='dialog'
      style={{ display: display !== "" ? "block" : "" }}
      aria-labelledby='exampleModalLabel'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header' style={{ justifyContent: "center" }}>
            <h5 className='modal-title'>{setModalTitle()}</h5>
          </div>
          <div
            className='modal-body'
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <input
                  id='category_id'
                  type='text'
                  className='form-control'
                  placeholder='Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list='caterogy_list'
                />
                <datalist id='caterogy_list'>
                  {productList.map((item: Product) => (
                    <option key={item.id}>{item.category}</option>
                  ))}
                </datalist>
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setCategory("");
                      document.getElementById("category_id")?.focus();
                    }}
                  >
                    Category
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <input
                  id='product_id'
                  type='text'
                  className='form-control'
                  placeholder='Category'
                  value={product}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setProduct(e.target.value);
                    productList.filter((item) => {
                      if (item.product == newVal) {
                        setCategory(item.category);
                        return;
                      }
                    });
                  }}
                  list='product_list'
                />
                <datalist id='product_list'>
                  {productList.map((item: Product) => (
                    <option key={item.id}>{item.product}</option>
                  ))}
                </datalist>

                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setProduct("");
                      document.getElementById("product_id")?.focus();
                    }}
                  >
                    Product
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <input
                  id='multiply_id'
                  type='number'
                  className='form-control'
                  placeholder='Category'
                  value={multiply}
                  onChange={(e) => setMultiply(e.target.value)}
                />
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setMultiply("");
                      document.getElementById("multiply_id")?.focus();
                    }}
                  >
                    Multiply
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <input
                  id='price_id'
                  type='number'
                  className='form-control'
                  placeholder='Category'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setPrice("");
                      document.getElementById("price_id")?.focus();
                    }}
                  >
                    Price
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            {setSubmitButton()}
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
              onClick={() => closeDisplay(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModify;
