import ACTION_USER from "../actions/actionUser";

const actionCreatorUser = (user) => {
  return {
    type: ACTION_USER,
    user,
  };
};

export default actionCreatorUser;
