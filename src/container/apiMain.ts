import { connect } from "react-redux";
import { PROGRESS_STATUS } from "../actions/home";
export default connect(
  (state: any) => ({ progress: state.progress }),
  (dispatch: any) => ({
    updateProgress(state: boolean) {
      dispatch({
        type: PROGRESS_STATUS,
        payload: state
      });
    }
  })
);
