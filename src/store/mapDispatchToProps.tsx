import { AnyAction, bindActionCreators, Dispatch } from "redux";
import actionCreatorValue from "./actionCreators/actionCreatorValue";
import actionCreatorPage from "./actionCreators/actionCreatorPage";

const mapDispatchToProps = (component) => {
  return (dispatch: Dispatch<AnyAction>) => {
    return {
      change_value: bindActionCreators(actionCreatorValue, dispatch),
      change_page: bindActionCreators(actionCreatorPage, dispatch),
    };
  };
};

export default mapDispatchToProps;
