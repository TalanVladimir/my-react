import ACTION_EMAIL from "../actions/actionEmail";
import initialState from "../initialState";

const email = (state = initialState.email, action) => {
  switch (action.type) {
    case ACTION_EMAIL:
      return action.email;
    default:
      return state;
  }
};

export default email;
