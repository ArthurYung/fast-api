import {
  HistoryActionType,
  HISTORY_RESULT,
  TimerDataInfo
} from "../actions/history";

export default function progress(
  state: TimerDataInfo[] = [],
  action: HistoryActionType
) {
  switch (action.type) {
    case HISTORY_RESULT:
      return [action.payload].concat(state);
    default:
      return state;
  }
}
