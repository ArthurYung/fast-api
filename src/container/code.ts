import { connect } from "react-redux";
import { UpdateProgress } from "../actions/home";
import {
  updateHistoryResultData,
  changeHistoryTimer,
  TimerDataInfo,
  ChangeTimerInfo
} from "../actions/history";
export default connect(
  (state: any) => ({ progress: state.progress, currCode: state.currCode }),
  (dispatch: any) => ({
    updateProgress(state: boolean) {
      dispatch(UpdateProgress(state));
    },
    updateHistoryTimer(info: TimerDataInfo) {
      dispatch(updateHistoryResultData(info));
    },
    changeHistoryTimer(info: ChangeTimerInfo) {
      dispatch(changeHistoryTimer(info));
    }
  })
);
