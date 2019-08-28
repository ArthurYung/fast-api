import { connect } from "react-redux";
import { UpdateProgress } from "../actions/home";
import { updateHistoryResultData, TimerDataInfo } from "../actions/history";
export default connect(
  (state: any) => {
    return { progress: state.progress, currCode: state.currCode };
  },
  (dispatch: any) => ({
    updateProgress(state: boolean) {
      dispatch(UpdateProgress(state));
    },
    updateHistoryList(info: TimerDataInfo) {
      dispatch(updateHistoryResultData(info));
    }
  })
);
