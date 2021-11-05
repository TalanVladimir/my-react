import { AnyAction, bindActionCreators, Dispatch } from "redux";
import actionCreatorValue from "./actionCreators/actionCreatorValue";
import actionCreatorPage from "./actionCreators/actionCreatorPage";
import actionCreatorUser from "./actionCreators/actionCreatorUser";
import actionCreatorEmail from "./actionCreators/actionCreatorEmail";

const mapDispatchToProps = (component) => {
  return (dispatch: Dispatch<AnyAction>) => {
    return {
      change_value: bindActionCreators(actionCreatorValue, dispatch),
      change_page: bindActionCreators(actionCreatorPage, dispatch),
      change_user: bindActionCreators(actionCreatorUser, dispatch),
      change_email: bindActionCreators(actionCreatorEmail, dispatch),
    };
  };
};

export default mapDispatchToProps;
