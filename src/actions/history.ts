export const HISTORY_RESULT = "HISTORY_RESULT";
export type HISTORY_RESULT = typeof HISTORY_RESULT;

export interface TimerDataInfo {
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
