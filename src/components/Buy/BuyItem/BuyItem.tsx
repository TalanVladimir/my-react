import React, { Fragment, useState, useEffect } from "react";

import "./styles.scss";

const BuyItem = (props: any) => {
  const { children, setModify } = props;
  const { id, category, product, multiply, price } = children;
  const { index } = props;

  return (
    <tr
      className='buyItem'
      onClick={() => {
        setModify(children);
      }}
    >
      <th scope='row'>{index + 1}</th>
      <td>{category}</td>
      <td>{product}</td>
      <td>{multiply}</td>
      <td>{price}</td>
    </tr>
  );
};

export default BuyItem;
