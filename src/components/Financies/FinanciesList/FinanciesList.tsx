import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { connect } from "react-redux";
import mapStateToProps from "../../../store/mapStateToProps";
import mapDispatchToProps from "../../../store/mapDispatchToProps";

import "./styles.scss";

const FinanciesList = ({ change_page }) => {
  useEffect(() => change_page("Financies"), []);

  return (
    <section className='financies'>
      <Container>
        Financies
        <img
          src='https://thumbs.dreamstime.com/b/under-construction-10012274.jpg'
          className='rounded img-fluid align-self-center'
          alt='...'
        />
      </Container>
    </section>
  );
};

export default connect(
  mapStateToProps(FinanciesList),
  mapDispatchToProps(FinanciesList)
)(FinanciesList);
