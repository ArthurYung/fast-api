export const HISTORY_RESULT = "HISTORY_RESULT";
export type HISTORY_RESULT = typeof HISTORY_RESULT;

export interface TimerDataInfo {
  id: number;
  name: string;
  useTime: number;
  status: number;
  date?: number;
  children: TimerDataInfo[];
}

export interface HistoryActionType {
  type: HISTORY_RESULT;
  payload: TimerDataInfo;
}

export function updateHistoryResultData(
  timerData: TimerDataInfo
): HistoryActionType {
  return {
    type: HISTORY_RESULT,
    payload: timerData
  };
}
