import { AnyAction, bindActionCreators, Dispatch } from "redux";
import action from "./actionCreators/action";

const mapDispatchToProps = (component) => {
  return (dispatch: Dispatch<AnyAction>) => {
    return { change_value: bindActionCreators(action, dispatch) };
  };
};

export default mapDispatchToProps;
