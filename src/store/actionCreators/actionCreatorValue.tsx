import ACTION_VALUE from "../actions/actionValue";

const actionCreatorValue = (value) => {
  return {
    type: ACTION_VALUE,
    value,
  };
};

export default actionCreatorValue;
