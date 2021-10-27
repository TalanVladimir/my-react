import React, { Fragment } from "react";

import { Form, Button } from "react-bootstrap";

import "./styles.scss";

const BuyItem = (props: any) => {
  return (
    <tr className='buyItem' key={props.children.id}>
      <th scope='row'>{props.index + 1}</th>
      <td>{props.children.category}</td>
      <td>{props.children.product}</td>
      <td>{props.children.price}</td>
      <td>
        <Button variant='primary' type='button'>
          Submit
        </Button>
      </td>
    </tr>
  );
};

export default BuyItem;
