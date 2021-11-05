import ACTION from "../actions/action";

const action = (value) => {
  return {
    type: ACTION,
    value,
  };
};

export default action;
