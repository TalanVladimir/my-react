import ACTION_VALUE from "../actions/actionValue";
import initialState from "../initialState";

const value = (state = initialState.value, action) => {
  switch (action.type) {
    case ACTION_VALUE:
      return action.value;
    default:
      return state;
  }
};

export default value;
