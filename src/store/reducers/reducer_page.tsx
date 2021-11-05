import ACTION_PAGE from "../actions/actionPage";
import initialState from "../initialState";

const page = (state = initialState.page, action) => {
  switch (action.type) {
    case ACTION_PAGE:
      return action.page;
    default:
      return state;
  }
};

export default page;
