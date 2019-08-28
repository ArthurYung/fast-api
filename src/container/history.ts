import { connect } from "react-redux";
import {
  deleteHistoryTimerData,
  TimerDataInfo,
  setCurrentCodeInfo
} from "@/actions/history";
import { DatabaseCodeInfo } from "@/utils/types";

export default connect(
  (state: any) => {
    return { historyData: state.history };
  },
  (dispatch: any) => ({
    deleteTimer(timerInfo: TimerDataInfo) {
      dispatch(deleteHistoryTimerData(timerInfo));
    },
    setCurrCodeInfo(codeInfo: DatabaseCodeInfo) {
      dispatch(setCurrentCodeInfo(codeInfo));
    }
  })
);
