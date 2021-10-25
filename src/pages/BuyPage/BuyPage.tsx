import React, { Fragment } from "react";

import Navigation from "../../components/Navigation";
import BuyList from "../../components/Buy/BuyList";

const BuyPage = () => {
  return (
    <Fragment>
      <Navigation />
      <BuyList />
    </Fragment>
  );
};

export default BuyPage;
