import {
  HistoryActionType,
  HISTORY_RESULT,
  TimerDataInfo,
  DELETE_TIMER,
} from "../actions/history";

export default function progress(
  state: TimerDataInfo[] = [],
  action: HistoryActionType
) {
  switch (action.type) {
    case HISTORY_RESULT:
      return [action.payload].concat(state).splice(0, 99);
    case DELETE_TIMER:
      const index = state.indexOf(action.payload);
      let baseState = [...state];
      if (index > -1) {
        baseState.splice(index, 1);
      }
      return baseState;
    default:
      return state;
  }
}
