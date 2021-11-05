import ACTION from "../actions/action";
import initialState from "../initialState";

const value = (state = initialState.value, action) => {
  switch (action.type) {
    case ACTION:
      return action.value;
    default:
      return state;
  }
};

export default value;
