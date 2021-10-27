import React, { Fragment, useState, useEffect } from "react";

import * as Icon from "react-bootstrap-icons";
import * as Boot from "react-bootstrap";

import "./styles.scss";

const BuyItem = (props: any) => {
  const [modify, setModify] = useState(false);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const { children } = props;
  const { id } = children;

  useEffect(() => {
    setCategory(children.category);
    setProduct(children.product);
    setPrice(children.price);

    console.log("product");
  }, []);

  return (
    <tr className='buyItem' key={children.id}>
      <th scope='row'>{props.index + 1}</th>
      <td>
        {modify ? (
          <input
            type='text'
            className='form-control'
            value={category}
            onChange={(event) => setCategory(event?.target.value)}
          />
        ) : (
          <a>{category}</a>
        )}
      </td>
      <td>
        {modify ? (
          <input
            type='text'
            className='form-control'
            value={product}
            onChange={(event) => setProduct(event?.target.value)}
          />
        ) : (
          <a>{product}</a>
        )}
      </td>
      <td>
        {modify ? (
          <input
            type='text'
            className='form-control'
            value={price}
            onChange={(event) => setPrice(event?.target.value)}
          />
        ) : (
          <a>{price} Eur</a>
        )}
      </td>
      <td>
        <Boot.Col className='buttons'>
          {modify ? (
            <Icon.Save
              onClick={() => {
                props.updateItem(id, category, product, price);
              }}
            />
          ) : (
            <Icon.Pencil
              onClick={() => {
                setModify(true);
              }}
            />
          )}{" "}
          <Icon.Trash
            onClick={() => {
              props.deleteItem(id);
            }}
          />
        </Boot.Col>
      </td>
    </tr>
  );
};

export default BuyItem;
