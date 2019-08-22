import { connect } from "react-redux";
import { UpdateProgress } from "../actions/home";
import { updateHistoryResultData, TimerDataInfo } from "../actions/history";
export default connect(
  (state: any) => ({ progress: state.progress }),
  (dispatch: any) => ({
    updateProgress(state: boolean) {
      dispatch(UpdateProgress(state));
    },
    updateHistoryList(info: TimerDataInfo) {
      dispatch(updateHistoryResultData(info));
    }
  })
);
