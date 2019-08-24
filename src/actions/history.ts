export const HISTORY_RESULT = "HISTORY_RESULT";
export type HISTORY_RESULT = typeof HISTORY_RESULT;
export const DELETE_TIMER = "DELETE_TIMER";
export type DELETE_TIMER = typeof DELETE_TIMER;

export interface TimerDataInfo {
  saved?: boolean;
  uid: string;
  id: string;
  name: string;
  root: boolean;
  startTime: number;
  endTime: number;
  parentId: string | null;
  status: number; // 0 - info, 1: success, 2: error
  children: TimerDataInfo[];
  useTime: number;
  date: number;
  error?: string;
}

export interface HistoryActionType {
  type: HISTORY_RESULT | DELETE_TIMER;
  payload: TimerDataInfo;
}

export function updateHistoryResultData(
  timerData: TimerDataInfo
): HistoryActionType {
  return {
    type: HISTORY_RESULT,
    payload: timerData,
  };
}

export function deleteHistoryTimerData(
  timerData: TimerDataInfo
): HistoryActionType {
  return {
    type: DELETE_TIMER,
    payload: timerData,
  };
}
