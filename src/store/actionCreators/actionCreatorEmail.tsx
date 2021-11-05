import ACTION_EMAIL from "../actions/actionEmail";

const actionCreatorEmail = (email) => {
  return {
    type: ACTION_EMAIL,
    email,
  };
};

export default actionCreatorEmail;
