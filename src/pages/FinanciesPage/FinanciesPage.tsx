import React, { Fragment } from "react";

import Navigation from "../../components/Navigation";
import FinanciesList from "../../components/Financies/FinanciesList";

const FinanciesPage = () => {
  return (
    <Fragment>
      <Navigation />
      <FinanciesList />
    </Fragment>
  );
};

export default FinanciesPage;
