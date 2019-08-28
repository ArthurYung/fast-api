import {
  HistoryActionType,
  HISTORY_RESULT,
  TimerDataInfo,
  DELETE_TIMER,
  ChangeHistoryActionType,
  CHANGE_TIMER
} from "../actions/history";

export default function progress(
  state: TimerDataInfo[] = [],
  action: HistoryActionType | ChangeHistoryActionType
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

    case CHANGE_TIMER:
      let find = -1;
      state.forEach((dataInfo, index) => {
        if (dataInfo.id === action.payload.id) {
          find = index;
        }
      });

      if (find < 0) return state;

      const newDataInfo = Object.assign({}, state[find], action.payload);

      state.splice(find, 1, newDataInfo);
      return [...state];

    default:
      return state;
  }
}
