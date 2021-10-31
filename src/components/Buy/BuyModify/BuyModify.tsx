import React, { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";

import "./styles.scss";

import Item from "../Item";

const BuyModify = (props: any) => {
  const { display, addItem, updateItem, deleteItem, closeDisplay, children } =
    props;

  const [id, setId] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [multiply, setMultiply] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setId(children.id);
    setCategory(children.category);
    setProduct(children.product);
    setMultiply(children.multiply);
    setPrice(children.price);
  }, [children]);

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
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                  >
                    Category
                  </div>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list='team_list'
                />
                <datalist id='team_list'>
                  <option>Beaf</option>
                  <option>Mild</option>
                  <option>Another</option>
                  <option>Kita</option>
                </datalist>
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                  >
                    Product
                  </div>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Category'
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                  >
                    Product
                  </div>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Category'
                  value={multiply}
                  onChange={(e) => setMultiply(e.target.value)}
                />
              </div>
            </div>
            <div className='col-auto'>
              <div className='input-group mb-2'>
                <div className='input-group-prepend' style={{ width: "90px" }}>
                  <div
                    className='input-group-text'
                    style={{ justifyContent: "center" }}
                  >
                    Price
                  </div>
                </div>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Category'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
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
