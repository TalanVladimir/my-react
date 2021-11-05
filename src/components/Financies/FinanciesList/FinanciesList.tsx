import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { connect } from "react-redux";
import mapStateToProps from "../../../store/mapStateToProps";
import mapDispatchToProps from "../../../store/mapDispatchToProps";

import initialState from "../../../store/initialState";

import "./styles.scss";

const FinanciesList = ({ value, change_value }) => {
  return (
    <section className='financies'>
      <Container>
        Financies
        <img
          src='https://thumbs.dreamstime.com/b/under-construction-10012274.jpg'
          className='rounded img-fluid align-self-center'
          alt='...'
          onClick={() => {
            const setValue =
              value === initialState.value ? "new_value" : initialState.value;
            change_value(setValue);
          }}
        />
      </Container>
    </section>
  );
};

export default connect(
  mapStateToProps(FinanciesList),
  mapDispatchToProps(FinanciesList)
)(FinanciesList);
