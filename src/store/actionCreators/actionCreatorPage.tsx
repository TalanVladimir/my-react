import ACTION_PAGE from "../actions/actionPage";

const actionCreatorPage = (page) => {
  return {
    type: ACTION_PAGE,
    page,
  };
};

export default actionCreatorPage;
