import ACTION_USER from "../actions/actionUser";
import initialState from "../initialState";

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case ACTION_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
