import { connect } from "react-redux";
import { deleteHistoryTimerData, TimerDataInfo } from "@/actions/history";

export default connect(
  (state: any) => ({ historyData: state.history }),
  (dispatch: any) => ({
    deleteTimer(timerInfo: TimerDataInfo) {
      dispatch(deleteHistoryTimerData(timerInfo));
    }
  })
);
